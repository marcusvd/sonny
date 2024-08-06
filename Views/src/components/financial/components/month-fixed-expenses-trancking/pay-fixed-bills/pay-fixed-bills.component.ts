import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';


import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BtnGComponent } from 'src/shared/components/btn-g/btn-g.component';
import { BankAccountMatSelectSingleComponent } from 'src/shared/components/get-entities/bank-account/bank-account-mat-select-single.component';
import { SelectedPaymentDto } from 'src/shared/components/get-entities/bank-account/dto/dto/selected-payment-dto';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { MonthFixedExpensesDto } from '../../month-fixed-expenses/dto/month-fixed-expenses-dto';
import { FieldsScreenPayment } from '../list/dto/fields-screen-payment';
import { FormBase } from './models/form-base';
import { PaymentMonthFixedBtnsFieldsComponent } from './payment-month-fixed-btns-fields.component';
import { PaymentMonthFixedScreenDataComponent } from './payment-month-fixed-screen-data.component';
import { PayFixedBillsService } from './services/pay-fixed-bills.service';

@Component({
  selector: 'pay-fixed-bills',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    CurrencyMaskModule,
    BtnGComponent,
    SubTitleComponent,
    TitleComponent,
    BankAccountMatSelectSingleComponent,
    PaymentMonthFixedScreenDataComponent,
    PaymentMonthFixedBtnsFieldsComponent
  ],
  templateUrl: './pay-fixed-bills.component.html',
  styleUrls: ['./pay-fixed-bills.component.css'],
  providers: [
    PayFixedBillsService,
  ]
})

export class PayFixedBillsComponent extends BaseForm implements OnInit {

  fields: FieldsScreenPayment[] = [];
  urlBackend: string = '';
  constructor(
    private _fb: FormBuilder,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _services: PayFixedBillsService,
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);

    if (this._router.getCurrentNavigation().extras.state) {
      const obj = this._router.getCurrentNavigation().extras.state;
      this.urlBackend = obj['entity'].urlBackend as string
      this.fields = obj['entity'].screenInfoFields as FieldsScreenPayment[]
      this.formMain = this.toFormGroup(obj['entity'].form as FormBase<string>[])
    }

  }

  toFormGroup(form: FormBase<string>[]) {
    const group: any = {};

    form.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || '', Validators.required) : new FormControl(field.value || '');
    });

    return new FormGroup(group);
  }

  fixedExpenses: MonthFixedExpensesDto = null;

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  fxLayout: string = 'row';

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.fxLayout = 'column';
            break;
          }
          case 'small': {
            this.fxLayout = 'column';
            break;
          }
          case 'medium': {
            this.fxLayout = 'row';
            break;
          }
          case 'large': {
            this.fxLayout = 'row';
            break;
          }
          case 'xlarge': {
            this.fxLayout = 'row';
            break;
          }
        }
      }
    })
  }

  onSelectedBanckAccountelected(bankAccount: any) {
    console.log(bankAccount)
  }

  formIsValid(value: boolean) {
    console.log(value)
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

  checkIsValid: boolean = false;
  updateBtn() {
    this.checkIsValid = true;
    if (this.formMain.valid) {
      if (this.alertSave(this.formMain)) {
        this._services.update(this.urlBackend, this.formMain);
      }
    }

  }

  ngOnInit(): void {
    this.screen();
  }

}
