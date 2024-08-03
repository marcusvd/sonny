import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { BaseForm } from 'src/shared/helpers/forms/base-form';
import { IScreen } from 'src/shared/helpers/responsive/iscreen';
import { FieldsScreenPayment } from './interface/fields-screen-payment';

@Component({
  selector: 'payment-screen-data',
  standalone: true,
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    // MatFormFieldModule,
    // MatInputModule,
    // FlexLayoutModule,
    // MatButtonModule,
    // MatCardModule,
    // CurrencyMaskModule,
    // PtBrCurrencyPipe,
    // PtBrDatePipe,
    // BtnGComponent,
    // SubTitleComponent,
    // TitleComponent,
    // BankAccountMatSelectSingleComponent
  ],
  templateUrl: './payment-screen-data.component.html',
  styles: [`
  .span-pipe {
    font-size: 30px;
    color: rgb(43, 161, 168);
  }
  .span-title {
    font-weight: bolder;
  }
`],
  providers: [

  ]
})

export class PaymentScreenData extends BaseForm implements OnInit {

  @Input() fields: FieldsScreenPayment[] = [];

  constructor(
    override _breakpointObserver: BreakpointObserver,

  ) {
    super(_breakpointObserver);
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

  ngOnInit(): void {


  }

}
