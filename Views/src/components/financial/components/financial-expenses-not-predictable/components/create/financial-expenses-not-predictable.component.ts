import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';

import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { CommunicationAlerts, ToolTips } from 'src/shared/services/messages/snack-bar.service';
import { FinancialBankAccountDto } from '../../../checking-account/dto/financial-bank-account-dto';
import { FinancialExpensesDto } from '../../../financial-expenses/dto/financial-expenses-dto';

import { FinancialCardDto } from '../../../checking-account/dto/financial-card-dto';
import { FinancialExpensesNotPredictableDto } from '../../dtos/financial-expenses-not-predictable-dto';
import { FinancialExpensesNotPredictableService } from '../../services/financial-expenses-not-predictable.service';
import { tap } from 'rxjs/operators';
import { CustomerDto } from 'src/components/main/customer/dtos/customer-dto';
import { CustomerGridDto } from 'src/components/main/customer/dtos/customer-grid-dto';
import { Observable, of } from 'rxjs';
import { GridListOptsGHelper } from 'src/shared/components/grid-list-opts/helpers/grid-list-opts-helper';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatCheckbox } from '@angular/material/checkbox';


@Component({
  selector: 'financial-expenses-not-predictable-create',
  templateUrl: './financial-expenses-not-predictable.component.html',
  styleUrls: ['./financial-expenses-not-predictable.component.css'],
  // providers: [EssentialExpensesService]
})
export class FinancialExpensesNotPredictableCreateComponent extends BaseForm implements OnInit, AfterViewInit {

  screenFieldPosition: string = 'row';
  errorMsg: string;
  entities: CustomerGridDto[] = [];
  entities$: Observable<CustomerGridDto[]>;
  pageSize: number = 5;
  lengthCustomer: number;
  pageSizeOptions: number[] = [5, 10, 20];
  customerGridGHelper = new GridListOptsGHelper(this._http, this._route);
  cssColumns: string[] = ['max-width: 5px;', 'max-width: 5px;']
  headers: string[] = ['', 'Nome', 'Atividade'];

  @Input() fieldsInEnglish: string[] = ['name', 'bussinesLine'];
  // get essentialExpensesArray(): any[] {
  //   return this._financialExpensesNotPredictableService.EssentialExpensesArray
  // }

  expensesLocal:boolean = true;
  expensesLocalMtd($event:MatCheckbox){
    const checked = $event.checked;
    this.formMain.get('customerId').setValue(null);
    this.expensesLocal= !checked;
  }

  defaultSelectedCycle = 'MENSAL';
  get expirationCycleArray(): any[] {
    return null;
    // return this._financialExpensesNotPredictableService.bankAccounts
  }

  constructor(
    private _fb: FormBuilder,
    private _financialExpensesNotPredictableService: FinancialExpensesNotPredictableService,
    private _communicationsAlerts: CommunicationAlerts,
    private _http: HttpClient,
    private _route: ActivatedRoute,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  messageTooltipNameOther = 'Para uma despesa nova, selecione "OUTROS" no menu acima.'

  private toolTipsMessages = ToolTips;
  get matTooltip() {
    return this.toolTipsMessages
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  banckAccountsMtd(id: number) {
    this.bankACards = [];
    this.banckAccounts.forEach(x => {
      x.cards.forEach(xy => {
        if (xy.bankAccountId == id)
          this.bankACards.push(xy);
      })
    })
  }

  currentDate(){
    console.log(new Date().toDateString())
    return new Date("01/12/2024");
  }

  showCards: boolean = false;
  PaidBy = Object.keys({ 'Pix': 0, 'Débito': 1, 'Crédito': 2, 'Transferência': 3, 'Ted': 4, 'Doc': 5, 'Dinheiro': 6 })
  paidByMtd(key: string) {
    switch (key) {

      case '0': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '1': {
        this.showCards = true;
        break
      }
      case '2': {
        this.showCards = true;
        break
      }
      case '3': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '4': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '5': {
        this.showCards = false;

        this.formMain.get('cardId').setValue(null);
        break
      }
      case '5': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }
      case '6': {
        this.showCards = false;
        this.formMain.get('cardId').setValue(null);
        break
      }

    }
  }

  formLoad() {
    this.formMain = this._fb.group({
      userId: [JSON.parse(localStorage.getItem('userId')), [Validators.required]],
      // expensesId: ['', [Validators.required]],
      bankAccountId: ['', [Validators.required]],
      paidBy: ['', [Validators.required]],
      cardId: ['', []],
      customerId: ['', []],
      itemOrPlaceName: ['', []],
      daySpent: ['', [Validators.required]],
      entryRegister: [new Date(), [Validators.required]],
      price: [0, [Validators.required]],
      description: ['', []],
    })
    this.formMain.get('daySpent').setValue(new Date())
  }



  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'small': {
            this.screenFieldPosition = 'column'
            break;
          }
          case 'medium': {
            this.screenFieldPosition = 'row'

            break;
          }
          case 'large': {
            this.screenFieldPosition = 'row'
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = 'row'
            break;
          }
        }
      }
    })
  }

  queryFieldOutput($event: FormControl) {

    const term = $event;

    this.entities$ = of(this.entities.filter((xy: CustomerGridDto) =>

      xy.name.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
      ||
      xy.bussinesLine.toLocaleLowerCase().includes(term.value.toLocaleLowerCase())
    ))

  }
  save() {

    if (this.alertSave(this.formMain)) {
      this._financialExpensesNotPredictableService.save(this.formMain)
        .subscribe({
          next: (EssentialExpensesDto: FinancialExpensesNotPredictableDto) => {
            this._communicationsAlerts.communication('', 0, 2, 'top', 'center');
              this.formMain.reset();
          },
          error: (errors) => {
            console.log(errors)
            // if (errors.error.Message === 'month')
            //   this.errorMsg = 'Esta conta de ciclo diário já esta paga.'

            // if (errors.error.Message === 'year')
            //   this.errorMsg = 'Esta conta de ciclo anual já esta paga.'

            // if (errors.error.Message === 'month')
            //   this.errorMsg = 'Esta conta de ciclo mensal já esta paga.'

             this._communicationsAlerts.communicationError('', 5, 2, 'top', 'center');
          }
        })
      // this.formLoad();
     }
  }


 radioAloneMtd(obj: any) {

  const selectedEntity = obj.entity;
  this.formMain.get('customerId').setValue(selectedEntity.id);

}

  customerBackEndUrl: string = 'customers/GetAllCustomersPagedAsync';

  @ViewChild('customerPaginator') customerPaginator: MatPaginator;
  ngAfterViewInit(): void {
    this.customerPaginator.page
      .pipe(
        tap(() => this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(this.customerPaginator.pageIndex + 1, this.customerPaginator.pageSize)))
      ).subscribe(() => {
      })
  }

  banckAccounts: FinancialBankAccountDto[] = [];
  bankACards: FinancialCardDto[] = [];
  expenses: FinancialExpensesDto[] = [];
  ngOnInit(): void {
    this.formLoad();
    this.screen();

    this._financialExpensesNotPredictableService.getBackAccounts().subscribe(
      (x: FinancialBankAccountDto[]) => {
        this.banckAccounts = x;
      }
    )


    this.customerGridGHelper.getLengthEntitiesFromBackEnd('customersLength');
    this.lengthCustomer = this.customerGridGHelper.length;

    this.customerGridGHelper.pageSize = this.pageSize;


    this.customerGridGHelper.getAllEntitiesPaged(this.customerBackEndUrl, this.customerGridGHelper.paramsTo(1, this.pageSize));

    this.customerGridGHelper.entities$.subscribe((x: CustomerDto[]) => {

      let viewDto = new CustomerGridDto;
      this.entities = [];
      x.forEach((xy: CustomerDto) => {
        viewDto = new CustomerGridDto();
        viewDto.id = xy.id;
        viewDto.name = xy.name;
        viewDto.bussinesLine = xy.businessLine;
        this.entities.push(viewDto);

      })

      this.entities$ = of(this.entities)
    })

  }

}
