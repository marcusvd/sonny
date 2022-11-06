import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { NavbarComponent } from 'src/shared/components/navbar/navbar.component';
import { SideNavComponent } from 'src/shared/components/side-nav/side-nav.component';
import { NavBackDirective } from 'src/shared/directives/nav-back.directive';
import { BackButtonComponent } from 'src/shared/components/back-button/back-button.component';
import { MaterialModule } from "./material.module";

import { MsgOperation } from "../services/messages/snack-bar.service";
import { DialogQuizComponent } from "src/shared/components/dialog-quiz/dialog-quiz.component";

import { IConfig, NgxMaskModule } from "ngx-mask";
import { SharedRoutingModule } from "../routes/shared.routing.module";
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { PaginatedTableGComponent } from "../components/table-g/component/paginated-table-g.component";
import { SearchTableGComponent } from "../components/table-g/component/search-table-g.component";
import { AddressComponent } from "../components/address/component/address.component";
import { ContactComponent } from "../components/contact/component/contact.component";
import { ContactService } from "../components/contact/services/contact.service";
import { AddressService } from "../components/address/services/address.service";


import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BaseForm } from "../helpers/forms/base-form";
import { ExpansionPanelGModule } from "../components/expansion-panel-g/module/expansion-panel-g.module";
import { TabGModule } from "../components/tab-g/modules/tab-g.module";
import { ContactDetailsComponent } from "../components/contact-details/component/contact-details.component";
import { TreeGModule } from "../components/tree-g/modules/tree-g.module";
import { CardGModule } from "../components/card-g/module/card-g.module";
import { TitleModule } from "../components/title/module/title.module";
import { DialogQuizModule } from "../components/dialog-quiz/modules/dialog-quiz.module";
import { StepperGModule } from "../components/stepper-g/module/stepper-g.module";

registerLocaleData(localePt, 'pt-BR');
registerLocaleData(localePt, 'pt-BR');


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "center",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
const maskConfigFunction: () => Partial<IConfig> = () => {
  return {
    validation: false,
  };
};



@NgModule({
  declarations: [
    BaseForm,
    NavbarComponent,
    SideNavComponent,
    NavBackDirective,
    BackButtonComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    ContactComponent,
    ContactDetailsComponent,

  ],

  imports: [
    //ANGULAR IMPORTS
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    //MY IMPORTS
    MaterialModule,
    SharedRoutingModule,
    CurrencyMaskModule,
    ExpansionPanelGModule,
    NgxMaskModule.forRoot(maskConfigFunction),
    TabGModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    StepperGModule
  ],

  exports: [
    NavbarComponent,
    SideNavComponent,
    NavBackDirective,
    BackButtonComponent,
    DialogQuizComponent,
    SearchTableGComponent,
    PaginatedTableGComponent,
    AddressComponent,
    ContactComponent,
    MaterialModule,
    CurrencyMaskModule,
    ExpansionPanelGModule,
    NgxMaskModule,
    TabGModule,
    TreeGModule,
    CardGModule,
    TitleModule,
    DialogQuizModule,
    StepperGModule,
  ],

  providers: [

    MsgOperation,
    AddressService,
    ContactService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
  ]

})

export class SharedModule {

}
