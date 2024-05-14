import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';


import { AddressComponent } from 'src/shared/components/address/component/address.component';
import { AddressService } from 'src/shared/components/address/services/address.service';
import { DescriptionFieldComponent } from 'src/shared/components/administrative/info/description-field.component';
import { BusinessData } from 'src/shared/components/administrative/name-cpf-cnpj/dto/business-data';
import { NameCpfCnpjComponent } from 'src/shared/components/administrative/name-cpf-cnpj/name-cpf-cnpj.component';
import { BtnSaveGComponent } from 'src/shared/components/btn-save-g/btn-save-g.component';
import { ContactComponent } from 'src/shared/components/contact/component/contact.component';
import { ContactService } from 'src/shared/components/contact/services/contact.service';
import { FinancialPixComponent } from 'src/shared/components/financial/pix/financial-pix.component';
import { SubTitleComponent } from 'src/shared/components/sub-title/sub-title.component';
import { TitleComponent } from 'src/shared/components/title/components/title.component';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { PhoneHandlers } from "src/shared/helpers/handlers/phone-handlers";
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FinancialInfoTypeComponent } from '../../customer/components/commons-components/financial-info-type/financial-info-type.component';
import { MainEntitiesBaseComponent } from '../../inheritances/main-entities-base/main-entities-base.component';
import { PhysicallyMovingCostsComponent } from '../../inheritances/physically-moving-costs/physically-moving-costs.component';
import { PhysicallyMovingCostsService } from '../../inheritances/physically-moving-costs/service/physically-moving-costs.service';
import { PaymentDataComponent } from '../commons-components/info-bank/payment-data.component';
import { PartnerCreateService } from './services/partner-create.service';
@Component({
  selector: 'partner-create',
  templateUrl: './partner-create.component.html',
  styleUrls: ['./partner-create.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatCardModule,
    MatTooltipModule,
    NameCpfCnpjComponent,
    TitleComponent,
    SubTitleComponent,
    MainEntitiesBaseComponent,
    DescriptionFieldComponent,
    FinancialInfoTypeComponent,
    PhysicallyMovingCostsComponent,
    ContactComponent,
    AddressComponent,
    PaymentDataComponent,
    NameCpfCnpjComponent,
    BtnSaveGComponent,
    FinancialPixComponent
  ]
})
export class PartnerCreateComponent extends BaseForm implements OnInit {

  // messageTooltipBusinessLineOther = 'Para um novo segmento, selecione "OUTROS" no menu esquerdo.'

  // private toolTipsMessages = ToolTips;
  // get matTooltip() {
  //   return this.toolTipsMessages
  // }

  title: string = "Parceiros";
  subTitle: string = 'Cadastro Parceiro';

  address: FormGroup;
  contact: FormGroup;

  screenFieldPosition: string = 'row';


  // startDate = new Date(2021, 0, 1);

  constructor(
    private _fb: FormBuilder,
    private _partnerCreateService: PartnerCreateService,
    private _contactService: ContactService,
    private _addressService: AddressService,
    private _physicallyMovingCostsService: PhysicallyMovingCostsService,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  // get specificBusinessLine(){
  //   return this._partnerCreateService.businesslineArray
  // }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
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


  cpfCnpjBusinessData(data: BusinessData) {

    this.setFormMain(data);
    this.setAddressForm(data);
    this.setContactForm(data);

  }


  setFormMain(data: BusinessData) {
    if (data.qsa.length > 0)
      this.formMain.get('responsible').setValue(data.qsa[0].nome);
    else
      this.formMain.get('responsible').setValue(data.nome);

    this.formMain.get('name').setValue(data.nome);
    this.formMain.get('businessLine').setValue(data.atividade_principal[0].text);
  }

  setAddressForm(data: BusinessData) {
    this.address.reset();
    this.address.get('zipcode').setValue(data.cep);
    this._addressService.query(data.cep)
    this.address.get('number').setValue(data.numero);
    this.address.get('id').setValue(0);
  }

  setContactForm(data: BusinessData) {
    this.contact.reset();
    this.contact.get('id').setValue(0);
    this.contact.get('email').setValue(data.email);

    const isMobile = PhoneHandlers.handlerApiPhoneNumberFromReceitaWs(data.telefone)

    if (isMobile.isMobile)
      this.contact.get('cel').setValue(isMobile.phoneNum);
    else
      this.contact.get('landline').setValue(isMobile.phoneNum);

    this.validatorCustom.atLeastOneValidationBlur(this.contact, ['cel', 'zap', 'landline']);

  }

  paymentDataForm: FormGroup;
  pixes: FormGroup;
  bankAccount: FormGroup;
  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      companyId: [localStorage.getItem("companyId"), [Validators.required]],
      registered: [new Date(), [Validators.required]],
      cnpj: ['', [Validators.required]],
      responsible: ['', [Validators.required, Validators.maxLength(100),]],
      businessLine: ['', [Validators.required, Validators.maxLength(100)]],
      entityType: [true, []],
      partnerBusiness: [6, []],
      description: ['', [Validators.maxLength(500)]],
      physicallyMovingCosts: this.subForm = this._physicallyMovingCostsService.subFormLoad(),
      address: this.address = this._addressService.formLoad(),
      contact: this.contact = this._contactService.formLoad(),
      paymentsData: this.paymentDataForm = this._fb.group({
        pixes: this._fb.array([]),
        bankAccounts: this._fb.array([]),
        others: ['', []],
        money: [true, []],
      })
    })
  }

  get pixesFormArray() {
    return this.paymentDataForm.get('pixes') as FormArray
  }

  addPix() {
    this.pixesFormArray.push(this.pixesFormGroup())
  }

  removePix(index: number) {
    this.pixesFormArray.removeAt(index);
  }

  pixesFormGroup() {
    return this.pixes = this._fb.group({
      id: [0, [Validators.required]],
      key: ['', [Validators.required]],
      value: ['', [Validators.required]],
    })
  }

  get bankAccountFormArray() {
    return this.paymentDataForm.get('bankAccounts') as FormArray
  }

  addBankAccount() {
    this.bankAccountFormArray.push(this.bankAccountFormGroup())
  }

  removeBankAccount(index: number) {
    this.bankAccountFormArray.removeAt(index);
  }

  bankAccountFormGroup() {
    return this.bankAccount = this._fb.group({
      id: ['', []],
      institution: ['', []],
      account: ['', []],
      agency: ['', []],
      type: ['', []],
      paymentDataId: ['', []],
      paymentData: ['', []],
      description: ['', []],
    })
  }

  save() {

    if (this.formMain.get('businessLine').value.toLocaleLowerCase() === 'selecione uma opção') {
      this.formMain.get('businessLine').setErrors({ changeOpt: true })
    }

    if (this.alertSave(this.formMain)) {
      this._partnerCreateService.save(this.formMain);
      this.formLoad();
    }

  }

  ngOnInit(): void {
    this.formLoad();
    this.addPix();
    this.screen();
  }

}
