import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BudgetServiceDto } from 'src/components/bench-budget-service/dto/budget-service-dto';
import { BudgetServiceGridListDto } from 'src/components/bench-budget-service/dto/budget-service-grid-list-dto';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { PtBrDataPipe } from 'src/shared/pipes/pt-br-date.pipe';

@Component({
  selector: 'tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit, AfterViewInit {

  gridListOptsGHelper = new GridListOptsGHelper(this._http, this._route);

  entities: BudgetServiceGridListDto[];
  entities$: Observable<BudgetServiceGridListDto[]>;

  constructor(
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private datePipe: PtBrDataPipe
  ) { }

  lengthBs: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.gridListOptsGHelper.getAllEntitiesPaged('BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(1, this.pageSize))

    let viewDto: BudgetServiceGridListDto;

    this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {

      this.entities = [];

      x.forEach((xy: BudgetServiceDto) => {
        viewDto = new BudgetServiceGridListDto();
        viewDto.name = xy.customer.name
        viewDto.dataDescription = xy.dataDescription;
        viewDto.entryDate = this.datePipe.transform(xy.entryDate, 'Date');
        viewDto.isPresentVisuallyDescription = xy.isPresentVisuallyDescription
        viewDto.isRemote = xy.isRemote ? 'Sim' : 'Não';
        viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
        this.entities.push(viewDto);
      })
      this.entities$ = of(this.entities)
    })

    this.gridListOptsGHelper.getLengthEntitiesFromBackEnd('budgetServiceLength')

    this.lengthBs = this.gridListOptsGHelper.length;
    this.gridListOptsGHelper.pageSize = this.pageSize;

  }

  @ViewChild('pgBs') budgetServicePagination: MatPaginator
  ngAfterViewInit() {

    this.budgetServicePagination.page
      .pipe(
        tap(() => this.gridListOptsGHelper.getAllEntitiesPaged('BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(this.budgetServicePagination.pageIndex + 1, this.budgetServicePagination.pageSize)))
      ).subscribe();
  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.gridListOptsGHelper.searchQueryHendler(term,'BudgetsServices/GetAllPagedNoFinished', this.gridListOptsGHelper.paramsTo(1, this.pageSize));

    let viewDto: BudgetServiceGridListDto;
    this.gridListOptsGHelper.entities$.subscribe((x: BudgetServiceDto[]) => {

      this.entities = [];

      x.forEach((xy: BudgetServiceDto) => {
        viewDto = new BudgetServiceGridListDto();
        viewDto.name = xy.customer.name
        viewDto.dataDescription = xy.dataDescription;
        viewDto.entryDate = this.datePipe.transform(xy.entryDate, 'Date');
        viewDto.isPresentVisuallyDescription = xy.isPresentVisuallyDescription
        viewDto.isRemote = xy.isRemote ? 'Sim' : 'Não';
        viewDto.problemAccordingCustomer = xy.problemAccordingCustomer;
        this.entities.push(viewDto);
      })
      console.log(this.entities)
      this.entities$ = of(this.entities)
    })

  }

  headers: string[] = ['', 'Remoto', 'Aberto', 'Cliente', 'Defeitos', 'Visual', 'Acessos'];

  @Input() fieldsInEnglish: string[] = ['isRemote', 'entryDate', 'name', 'problemAccordingCustomer', 'isPresentVisuallyDescription', 'dataDescription'];

}
