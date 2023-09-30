import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { EletronicRepairCreateService } from '../services/eletronic-repair.create.service';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { GridGHelper } from 'src/shared/components/grid-g/helpers/grid-g-helper';
import { PartnerDto } from 'src/components/main/partner/dto/partner-dto';
import { TypePartnerEnumDto } from 'src/components/main/partner/dto/enums/type-partner-enum-dto';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';


@Component({
  selector: 'eletronic-repair',
  templateUrl: './eletronic-repair.component.html',
  styleUrls: ['./eletronic-repair.component.css']
})
export class EletronicRepairComponent extends BaseForm implements OnInit {

  //multiples places
  customerGridGHelper = new GridGHelper(this._http, this._route);
  partnerGridGHelper = new GridGHelper(this._http, this._route);

  constructor(
    private _eletronicRepairCreateService: EletronicRepairCreateService,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    override _breakpointObserver: BreakpointObserver,
  ) {
    super(_breakpointObserver)
  }

  //Only HTML every grids
  screenFieldPosition: string = 'row';
  pageSize: number = 5;
  lengthCustomer: number;
  pageSizeOptions: number[] = [5, 10, 20];
  searchItensFound: number;

  //GridCustomer Component
  //css HEADER
  //grid-template-columns:360px <= need include one for each new column
  styleGridContainerHeader: string = "margin-bottom: -15px;  display: grid; grid-template-columns:360px; grid-gap: 1px;";
  styleGridMatCardHeader: string = "color: white; border: 1px solid rgb(0, 83, 26); background-color: rgb(8, 65, 0); box-shadow: none;";
  //css ITEM
  //grid-template-columns:360px <= need include one for each new column
  styleGridContainerItem: string = 'display: grid; grid-template-columns:360px; grid-gap: 1px;';

  //Multiples Places
  customerBackEndUrl: string = 'customers/GetAllPagedCustomersAsync';
  partnerBackEndUrl: string = 'partners/GetAllPagedPartnersAsync';
  titlesHeaderCustomer: string[] = ['CLIENTES'];
  titlesHeaderPartner: string[] = ['PARCEIROS'];
  fieldsInEnglish: string[] = ['name'];
  searchInputFxFlexSize: number = 100;

  //GridPartner
  lengthPartner: number;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  outSelectedEntity($event: any) {
    const selectedEntity = $event;
    this.formMain.get('customerId').setValue(selectedEntity.id);
  }

  get partners() {
    return this._eletronicRepairCreateService.electronicRepairPartners;// return this._partners.filter(x => x.eletronicRepair);
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            break;
          }
        }
      }
    })
  }

  formLoad() {
    return this.formMain = this._fb.group({
      companyId: [JSON.parse(localStorage.getItem("companyId")), [Validators.required]],
      userId: [localStorage.getItem("userId"), [Validators.required]],
      item: ['', [Validators.required]],
      description: ['', []],
      problem: ['', [Validators.required]],
      userEquipament: ['', []],
      passwordEquipament: ['', []],
      price: [0, []],
      serviceProviderId: ['', [Validators.required]],
      customerId: ['', [Validators.required]],
    })

  }

  save() {

    if (this.alertSave(this.formMain)) {
      this._eletronicRepairCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  getLengthCustomer($event: any) {
    this.searchItensFound = this.customerGridGHelper.searchItensFound.value
  }

  @ViewChild('customerPaginator') customerPaginator: MatPaginator;
  ngAfterViewInit(): void {
    this.customerPaginator.page
      .pipe(
        tap(() => this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize)))
      ).subscribe(() => {
      })
  }

  ngOnInit(): void {

    this.formLoad();
    this.screen();

    this.customerGridGHelper.pageSize = this.pageSize;
    this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl);
    this.customerGridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.customerGridGHelper.length;
    //PartnerGrid
    this._eletronicRepairCreateService.loadPartners();
  }
}
