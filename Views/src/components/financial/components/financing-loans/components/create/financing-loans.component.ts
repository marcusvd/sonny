import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { BreakpointObserver } from '@angular/cdk/layout';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FinancingLoansService } from '../../services/financing-loans.service';
import { ValidatorMessages } from 'src/shared/helpers/validators/validators-messages';

@Component({
  selector: 'financing-loans',
  templateUrl: './financing-loans.component.html',
  styleUrls: ['./financing-loans.component.css'],

})
export class FinancingLoansComponent extends BaseForm implements OnInit {


  title: string = 'FINANCEIRO';
  subTitle: string = 'Financiamento';

  startDate = new Date();

  amountStartedExpirationInstallmentCols: number;
  amountStartedExpirationInstallmentRowHeight: string = '140px'

  userPasswordCols: number;
  userPasswordRowHeight: string = '140px';


  constructor(
    private _fb: FormBuilder,
    private _financingLoansService: FinancingLoansService,
    private _responsive: BreakpointObserver,
    override _breakpointObserver: BreakpointObserver,
  ) { super(_breakpointObserver) }



  private valMessages = ValidatorMessages;
  get validatorMessages() {
    return this.valMessages
  }


  formLoad() {
    this.formMain = this._fb.group({
      name: ['', [Validators.required, Validators.maxLength(150)]],
      amount: ['', [Validators.required]],
      started: ['', [Validators.required]],
      expiration: ['', [Validators.required, Validators.min(1), Validators.max(31)]],
      installment: ['', [Validators.required, Validators.min(1)]],
      user: ['', [Validators.maxLength(50)]],
      password: ['', [Validators.maxLength(20)]],
      institution: ['', [Validators.required, Validators.maxLength(150)]],
      duplicateUrl: ['', [Validators.maxLength(250)]],
      description: ['', [Validators.maxLength(150)]],
    })
  }

  screen() {
    this.screenSize().subscribe({
      next: (result: IScreen) => {
        switch (result.size) {
          case 'xsmall': {
            this.amountStartedExpirationInstallmentCols = 1;
            this.userPasswordCols = 1;
            break;
          }
          case 'small': {
            this.amountStartedExpirationInstallmentCols = 1;
            this.userPasswordCols = 1;
            break;
          }
          case 'medium': {
            this.amountStartedExpirationInstallmentCols = 2;
            this.userPasswordCols = 2;
            break;
          }
          case 'large': {
            this.amountStartedExpirationInstallmentCols = 4;
            this.userPasswordCols = 2;

            break;
          }
          case 'xlarge': {
            this.amountStartedExpirationInstallmentCols = 4;
            this.userPasswordCols = 2;
            break;
          }
        }
      }
    })


  }

  dateValidator(control: AbstractControl) {

  }


  save() {
    // this._financingLoansService.save(this.formMain).subscribe((result: boolean) => {
    //   if (result) {
    //     this.formMain.reset();
    //   }
    // })
    console.log(this.formMain);
  }

  ngOnInit(): void {
    this.formLoad();
    this.screen();
  }

}
