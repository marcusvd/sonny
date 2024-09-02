import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CategoryExpensesService } from 'src/components/financial/services/category-expenses.service';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { CategorySubcategoryExpensesSelectComponent } from 'src/shared/components/get-entities/category-subcategory-expenses-select/components/category-subcategory-expenses-select.component';
import { Add } from 'src/shared/components/inheritance/add/add';
import { IScreen } from 'src/shared/components/inheritance/responsive/iscreen';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { PayCycleEnumDto } from '../../../common-components/category-subcategory-expenses/dto/pay-cycle-enum-dto';
import { VariableExpenseDto } from '../../dto/variable-expense-dto';
import { VariableExpensesService } from './services/variable-expenses.service';
import { TypeCardDtoEnum } from '../../../bank-account-cards/dto/enums/type-card-dto.enum';
import { SelectedPaymentDto } from 'src/shared/components/get-entities/bank-account/dto/selected-payment-dto';


@Component({
  selector: 'variable-expenses',
  templateUrl: './variable-expenses-add.component.html',
  styleUrls: ['./variable-expenses-add.component.css'],
  providers: [
    VariableExpensesService,
    CategoryExpensesService
  ],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTooltipModule,
    CurrencyMaskModule,
    TitleComponent,
    SubTitleComponent,
    BankAccountMatSelectSingleComponent,
    CategorySubcategoryExpensesSelectComponent,
    BtnGComponent
  ],

})

export class VariableExpensesAddComponent extends Add implements OnInit {

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _variableExpensesService: VariableExpensesService,
    private _fillersService: CategoryExpensesService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  payCycle = PayCycleEnumDto.Variable;
  cardType = TypeCardDtoEnum.Credit;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  add() {
    this._router.navigateByUrl('/side-nav/financial-dash/category-expenses-add-edit')
  }

  makeEntityToUpdate(entity: SelectedPaymentDto) {
    this.formMain.get('bankAccountId').setValue(entity.idBankAccount);
    this.formMain.get('pixId').setValue(entity.idPix);
    this.formMain.get('othersPaymentMethods').setValue(entity.others);
    this.formMain.get('cardId').setValue(entity.idCard);

    if (this.formMain.get('pixId').value == '')
      this.formMain.get('pixId').setValue(null);

    if (this.formMain.get('cardId').value == '')
      this.formMain.get('cardId').setValue(null);

  }

  formIsValid(value: boolean) {
    // console.log(value)
  }

  onSelectedBanckAccountelected(bankAccount: any) {
    console.log(bankAccount)
  }

  checkIsValid: boolean = false;
  updateBtn() {
    this.checkIsValid = true;
    if (this.formMain.valid) {
      if (this.alertSave(this.formMain)) {
        //     this._services.update(this.urlBackend, this.formMain);
      }
    }

  }

  // fillersExpenses = new Observable<CategoryExpensesDto[]>();

  validation(field: string, addRemove: boolean) {
    if (addRemove) {
      this.formMain.get(field).addValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }

    if (!addRemove) {
      this.formMain.get(field).setValue(null);
      this.formMain.get(field).removeValidators(Validators.required);
      this.formMain.get(field).updateValueAndValidity();
    }
  }

  // subcategoriesExpenses = new Observable<SubcategoryExpensesDto[]>();
  // selectedCategoryExpensesId(id: number) {
  //   const selected = this.fillersExpenses.pipe(
  //     map((x: CategoryExpensesDto[]) => {
  //       return x.find(Xid => Xid.id == id).subcategoriesExpenses
  //     }),
  //   )
  //   this.subcategoriesExpenses = selected;
  // }

  formLoad(x?: VariableExpenseDto) {
    this.formMain = this._fb.group({
      id: [x?.id || 0, [Validators.required]],
      userId: [x?.userId || this.userId, [Validators.required]],
      companyId: [x?.user || this.companyId, [Validators.required]],
      categoryExpenseId: [x?.categoryExpenseId || '', [Validators.required]],
      subcategoryExpenseId: [x?.subcategoryExpenseId || '', [Validators.required]],
      bankAccountId: [x?.bankAccountId || '', [Validators.required]],
      cardId: [x?.cardId || '', []],
      pixId: [x?.pixId || '', []],
      othersPaymentMethods: [x?.othersPaymentMethods || '', []],
      item: [x?.item || '', [Validators.required]],
      place: [x?.place || '', [Validators.required]],
      wasPaid: [x?.wasPaid || new Date(), [Validators.required]],
      registered: [x?.registered || new Date(), [Validators.required]],
      price: [x?.price || 0, [Validators.required]],
      description: [x?.description || '', []],
    })
  }

  screenFieldPosition: string = 'row';
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


  makeSpaceFields() {

    if (this.screenFieldPosition === 'row') {
      if (
        (this?.formMain?.get('expiration')?.hasError('required') || this?.formMain?.get('expiration')?.hasError('min') || this?.formMain?.get('expiration')?.hasError('max')) && this?.formMain?.get('expiration')?.touched
        ||
        (this?.formMain?.get('numberInstallment')?.hasError('required') || this?.formMain?.get('numberInstallment')?.hasError('max')) && this?.formMain?.get('numberInstallment')?.touched
      )
        return true;
      else
        return false;
    }
    else
      return false;

  }


  save() {

    if (this.alertSave(this.formMain))
      this._variableExpensesService.save(this.formMain);

  }




  ngOnInit(): void {
    // this.fillersExpenses = this._fillersService.getFillers();
    this.formLoad();
    this.screen();
    // this.validation('categoryExpensesId', true);
  }

}
