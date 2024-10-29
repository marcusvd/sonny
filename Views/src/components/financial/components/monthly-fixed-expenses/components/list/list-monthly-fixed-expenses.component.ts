import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormControl, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
// import { FinancialResolver } from 'src/shared/components/financial/resolvers/financial.resolver';
import { GridListCommonSearchComponent } from 'src/shared/components/grid-list-common/grid-list-common-search.component';
import { GridListCommonTableComponent } from 'src/shared/components/grid-list-common/grid-list-common-table.component';
import { GridListCommonComponent } from 'src/shared/components/grid-list-common/grid-list-common.component';
import { GridListCommonHelper } from 'src/shared/components/grid-list-common/helpers/grid-list-common-helper';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { MonthsDto } from 'src/shared/components/months-select/months-dto';
import { MonthsSelectComponent } from 'src/shared/components/months-select/months-select-g.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { PtBrCurrencyPipe } from 'src/shared/pipes/pt-br-currency.pipe';
import { PtBrDatePipe } from 'src/shared/pipes/pt-br-date.pipe';
// import { MonthExpensesTrackingListFilter } from '../../common-components/static-business-rule/static-business-rule';

import { environment } from 'src/environments/environment';
import { FilterBtnRadioComponent } from '../../../common-components/filter-btn-radio/filter-btn-radio.component';
import { MonthlyFixedExpenseDto } from '../../dto/monthly-fixed-expense-dto';
import { ListGridMonthlyFixedExpenseDto } from './dto/monthly-fixed-expense-tracking-list-grid-dto';
import { BackEndFilterMonthlyExpensesList } from './filter-list/back-end-filter-monthly-expenses-list';
import { FrontEndListFilterMonthlyExpenses } from './filter-list/front-end-list-filter-monthly-expenses';

import { ListMonthlyFixedExpensesService } from './services/list-monthly-fixed-expenses.service';
import { TriggerPaymentMonthly } from './trigger-payment-monthly';


@Component({
  selector: 'list-monthly-fixed-expenses',
  templateUrl: './list-monthly-fixed-expenses.component.html',
  styleUrls: ['./list-monthly-fixed-expenses.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatRadioModule,
    GridListCommonComponent,
    GridListCommonTableComponent,
    GridListCommonSearchComponent,
    TitleComponent,
    BtnGComponent,
    SubTitleComponent,
    MonthsSelectComponent,
    FilterBtnRadioComponent
  ],
  providers: [
    ListMonthlyFixedExpensesService,
    PtBrDatePipe,
    PtBrCurrencyPipe,
  ]

})
export class ListMonthlyFixedExpensesComponent extends FrontEndListFilterMonthlyExpenses implements OnInit, AfterViewInit {
  constructor(
    override _actRoute: ActivatedRoute,
    override _router: Router,
    private _http: HttpClient,
    override _dialog: MatDialog,
    private _ptBrDatePipe: PtBrDatePipe,
    private _ptBrCurrencyPipe: PtBrCurrencyPipe,
    override _breakpointObserver: BreakpointObserver,
    override _listServices: ListMonthlyFixedExpensesService,
  ) {
    super(
      _dialog,
      _router,
      _actRoute,
      new GridListCommonHelper(_http),
      ['',
        //  'Categoria',
        //  'Subcategoria',
        'Vencimento',
        'Despesa',
        'Preço',
        'Status'],

      [
        //  'category',
        //  'subcategory',
        'expiresView',
        'name',
        'price'],

      _breakpointObserver,
      _listServices
    )
  }

  controllerUrl: string = environment._MONTHLY_FIXED_EXPENSES.split('/')[4];
  override backEndUrl: string = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
  override  entities: ListGridMonthlyFixedExpenseDto[] = [];
  override entities$: Observable<ListGridMonthlyFixedExpenseDto[]>;
  override viewUrlRoute: string = '/side-nav/financial-dash/view-monthly-fixed-expenses-tracking';
  override addUrlRoute: string = '/side-nav/financial-dash/monthly-fixed-expenses-add';

  // workingFrontEnd = new FrontEndListFilterMonthlyExpenses();
  workingBackEnd = new BackEndFilterMonthlyExpensesList();



  toPay: MonthlyFixedExpenseDto = null;
  listMonthlyFixedExpense: MonthlyFixedExpenseDto[] = [];
  getEntityTopay(entity: ListGridMonthlyFixedExpenseDto) {
    const monthlyExpense = this.listMonthlyFixedExpense.find(x => x.id == entity.id);

    this.pay.entityToPay = monthlyExpense;

    this.pay.callRoute(this.pay.entityToPay);
  }

  pay = new TriggerPaymentMonthly(
    this._router,
    this._ptBrDatePipe,
    this._ptBrCurrencyPipe,
  );

  screenFieldPosition: string = 'row';
  searchFieldMonthSelect: number = 90;
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column';
            this.searchFieldMonthSelect = 50;
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 70;
            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row';
            this.searchFieldMonthSelect = 90;
            break;
          }
        }
      }
    })
  }

  @ViewChild('radioExpired') radioExpired: MatRadioButton;
  @ViewChild('radioPedding') radioPedding: MatRadioButton;
  @ViewChild('radioPaid') radioPaid: MatRadioButton;

  clearRadios() {
    if (this.radioExpired && this.radioPedding && this.radioPaid) {
      this.radioExpired.checked = false;
      this.radioPedding.checked = false;
      this.radioPaid.checked = false;
    }
  }

  months: MonthsDto[] = [{ id: 0, name: 'JANEIRO' }, { id: 1, name: 'FEVEREIRO' }, { id: 2, name: 'MARÇO' },
  { id: 3, name: 'ABRIL' }, { id: 4, name: 'MAIO' }, { id: 5, name: 'JUNHO' }, { id: 6, name: 'JULHO' },
  { id: 7, name: 'AGOSTO' }, { id: 8, name: 'SETEMBRO' }, { id: 9, name: 'OUTUBRO' },
  { id: 10, name: 'NOVEMBRO' }, { id: 11, name: 'DEZEMBRO' }, { id: -1, name: 'TODOS' }]

  filterClear() {
    this.clearRadios();
    this.getCurrentPagedInFrontEnd();
    this.monthFilter = new MonthsDto();
    this.monthFilter.id = this.months[this.currentDate.getMonth()].id;
    this.monthFilter.name = this.months[this.currentDate.getMonth()].name;
    this.monthHideShowPendingRadio = this.monthFilter;
  }

  monthFilter = new MonthsDto();
  monthHideShowPendingRadio: MonthsDto = new MonthsDto();
  selectedMonth(month: MonthsDto) {
    this.monthFilter = null;
    this.clearRadios();
    this.monthFilter = month;
    this.monthHideShowPendingRadio = month;
    if (this.gridListCommonHelper.pgIsBackEnd) {
      this.workingBackEnd.selectedMonth();
    }
    else {
      if (this.monthFilter.id != -1) {
        this.entities$ = this.selectedByMonth(this.entities, 0, this.pageSize, this.monthFilter.id);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }

      if (this.monthFilter.id == -1) {
        this.entities$ = this.getAllLessThanOrEqualCurrentDate(this.entities, 0, this.pageSize);

        this.entities$.pipe(
          map(x => {
            this.gridListCommonHelper.lengthPaginator.next(x.length)
          })).subscribe();
      }
    }
  }

  filterView(checkbox: MatCheckboxChange) {
    if (this.gridListCommonHelper.pgIsBackEnd) {
      if (checkbox.source.value == 'expired') {
        this.workingBackEnd.isExpires()
      }

      if (checkbox.source.value == 'pending') {
        this.workingBackEnd.isPending()
      }

      if (checkbox.source.value == 'paid') {
        this.workingBackEnd.isPaid()
      }
    }
    else {

      // if (checkbox.source.value == 'expired') {

      //   this.entities$ = this.workingFrontEnd.isExpires(this.entities, this.monthFilter.id, 0, this.pageSize);

      //   this.entities$.pipe(
      //     map(x => {
      //       this.gridListCommonHelper.lengthPaginator.next(x.length)
      //     })).subscribe();
      // }

      // if (checkbox.source.value == 'pending') {

      //   this.entities$ = this.workingFrontEnd.isPending(this.entities, this.monthFilter.id, 0, this.pageSize);

      //   this.entities$.pipe(
      //     map(x => {
      //       this.gridListCommonHelper.lengthPaginator.next(x.length)
      //     })).subscribe();

      // }

      // if (checkbox.source.value == 'paid') {
      //   this.entities$ = this.workingFrontEnd.isPaid(this.entities, this.monthFilter.id, 0, this.pageSize);

      //   this.entities$.pipe(
      //     map(x => {
      //       this.gridListCommonHelper.lengthPaginator.next(x.length)
      //     })).subscribe();

      // }
    }

  }

  orderBy(field: string) {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.workingBackEnd.orderByFrontEnd();
    else {
      if (field.toLowerCase() == 'Vencimento'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'expiration': new Date() });

      if (field.toLowerCase() == 'Preço'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { price: 0 });

      if (field.toLowerCase() == 'Despesa'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'name': 'name' });

      if (field.toLowerCase() == 'Local'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'place': 'place' });

      if (field.toLowerCase() == 'Status'.toLowerCase())
        this.entities$ = this.orderByFrontEnd(this.entities$, { 'wasPaid': new Date() });
    }

  }


  queryFieldOutput($event: FormControl) {
    this.termSearched = $event.value

    if (this.monthFilter.id == -1)
      this.entities$ = this.searchField(this.entities, 0, this.pageSize, this.termSearched)

    if (this.monthFilter.id != -1)
      this.entities$ = this.searchField(this.entities, 0, this.pageSize, this.termSearched).pipe(
        map(x => x.filter(y => this.currentDate.getFullYear() == new Date(y.expires).getFullYear() && new Date(y.expires).getMonth() == this.monthFilter.id))
      )

      // this.entities$.pipe(
      //   map(x => {
      //     this.gridListCommonHelper.lengthPaginator.next(x.length)
      //   })).subscribe();

    // this.entities$ = this.searchField(this.entities,0, this.pageSize, this.termSearched).pipe(
    //   map(x=> x.filter(y => new Date(y.expiration).getMonth() == this.monthFilter.id))
    // )


  }

  get pedingRadioHide() {
    if (this.monthHideShowPendingRadio.id == -1)
      return false;

    return this.monthHideShowPendingRadio.id < this.currentDate.getMonth();
  }

  getData() {
    if (this.gridListCommonHelper.pgIsBackEnd)
      this.getCurrentEntitiesFromBackEndPaged();
    else {
      this.getCurrentEntitiesFromBackEnd();
    }
  }

  getCurrentEntitiesFromBackEndPaged() {

    this.backEndUrl = `${this.controllerUrl}/GetAllFixedExpensesByCompanyIdPagedAsync`;
    this.gridListCommonHelper.getAllEntitiesPaged(this.backEndUrl, this.gridListCommonHelper.paramsTo(1, this.pageSize));
    this.gridListCommonHelper.entities$.subscribe((x: MonthlyFixedExpenseDto[]) => {
      x.forEach((xy: MonthlyFixedExpenseDto) => {
        this.entities.push(this.makeGridItems(xy));
      })
      this.entities$ = of(this.entities)
    })
  }

  getCurrentPagedInFrontEnd() {
     this.entities$ = this.getCurrentByCurrentYearAndSelectedMonth(this.entities, 0, this.pageSize, this.monthFilter.id, 'expires')
  }

 

  getCurrentEntitiesFromBackEnd() {
    const comapanyId: number = this.companyId;
    this.gridListCommonHelper.getAllEntitiesInMemoryPaged(`${this.controllerUrl}/GetAllFixedExpensesByCompanyId`, comapanyId.toString());

    this.gridListCommonHelper.entitiesFromDbToMemory$.subscribe((x: MonthlyFixedExpenseDto[]) => {

      x.forEach((xy: MonthlyFixedExpenseDto) => {
        this.listMonthlyFixedExpense.push(xy)
        this.entities.push(this.makeGridItems(xy));
      })
      this.getCurrentPagedInFrontEnd();
    })
  }

  statusStyle: boolean[] = [];

  makeGridItems(xy: MonthlyFixedExpenseDto) {
    const wasPaid: Date = new Date(xy.wasPaid)
    const viewDto = new ListGridMonthlyFixedExpenseDto;
    viewDto.wasPaid = xy.wasPaid;
    viewDto.id = xy.id;
    // viewDto.category = xy.categoryExpense.name.toUpperCase();
    // viewDto.subcategory = xy.subcategoryExpense.name.toUpperCase();
    viewDto.name = xy.name;
    viewDto.expires = xy.expires
    viewDto.expiresView = this._ptBrDatePipe.transform(xy.expires, 'Date');
    this.statusStyle.push(wasPaid.getFullYear() != this.minValue.getFullYear())
    viewDto.price = this._ptBrCurrencyPipe.transform(xy.price);

    return viewDto;
  }

  ngOnInit(): void {
    this.screen();
    this._actRoute.data.subscribe(x => {
      this.gridListCommonHelper.totalEntities = x['loaded'] as number;
    })
    this.gridListCommonHelper.pgIsBackEnd = this.gridListCommonHelper.totalEntities > 1000 ? true : false;
    this.getData();
  }

}
