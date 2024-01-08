import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { ValidatorsCustomer } from '../../validators/customer/validators-customer';
import { ValidatorMessagesCustomer } from '../../validators/customer/validators-messages-customer';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';
import { FormGroup } from '@angular/forms';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { ValidatorsCustom } from 'src/shared/helpers/validators/validators-custom';

@Component({
  selector: 'financial-info-type',
  templateUrl: './financial-info-type.component.html',
  styleUrls: ['./financial-info-type.component.css']
})
export class FinancialInfoTypeComponent extends BaseForm implements OnInit {

  constructor(
    override _breakpointObserver: BreakpointObserver
  ) { super(_breakpointObserver) }

  ngOnInit(): void {
  }

  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }

  private valMessagesCustomer = ValidatorMessagesCustomer;
  get validatorMessagesCustomer() {
    return this.valMessagesCustomer
  }

  private valLocal = ValidatorsCustomer;
  get validatorsLocal() {
    return this.valLocal
  }

  private valCustom = ValidatorsCustom;
  get validatorCustom() {
    return this.valCustom
  }

  screenFieldPosition: string = 'row';
  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'small': {
            this.screenFieldPosition = "column"
            break;
          }
          case 'medium': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'large': {
            this.screenFieldPosition = "row"
            break;
          }
          case 'xlarge': {
            this.screenFieldPosition = "row"
            break;
          }
        }
      }
    })




  }

  @Input() override formMain: FormGroup;
  @Input() override subForm: FormGroup;
  @Input() additionalCosts: FormGroup;
  assured() {

    if (this.formMain.get('assured').value)
      this.assuredEnabled();

    if (!this.formMain.get('assured').value)
      this.assuredDisabled();

  }



  assuredEnabled() {
    this.formMain.controls['payment'].enable();
    this.formMain.controls['expiration'].enable();
    this.additionalCosts.controls['fixedPhysicallyMovingCosts'].enable();
  }
  assuredDisabled() {
    this.formMain.controls['payment'].disable();
    this.formMain.controls['expiration'].disable();
    this.additionalCosts.controls['fixedPhysicallyMovingCosts'].disable();
    this.formMain.get('payment').setValue(0)
    this.formMain.get('expiration').setValue(0)
    this.additionalCosts.get('fixedPhysicallyMovingCosts').setValue(0)
  }

}
