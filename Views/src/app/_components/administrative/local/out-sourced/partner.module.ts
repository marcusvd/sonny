import { NgModule } from "@angular/core";
import { RouterModule } from '@angular/router';
import { CommonModule } from "@angular/common";

import { PartnerCreateComponent } from 'src/app/_components/administrative/local/out-sourced/partner-create/partner-create.component';

import { PartnerSupplierListComponent } from 'src/app/_components/administrative/local/out-sourced/partner-supplier-list/partner-supplier-list.component';
import { PartnerListListComponent } from 'src/app/_components/administrative/local/out-sourced/partner-list-list/partner-list-list.component';
import { PartnerDetailsComponent } from 'src/app/_components/administrative/local/out-sourced/partner-details/partner-details.component';
import { PartnerEditComponent } from 'src/app/_components/administrative/local/out-sourced/partner-edit/partner-edit.component';
import { PartnerRoutingModule } from "src/app/_components/administrative/local/out-sourced/partner.module.routing";
import { MaterialModule } from "src/app/_shared/modules/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/_shared/modules/shared.module";
import { PartnerEditResolver } from "src/app/_components/administrative/local/out-sourced/resolvers/partner.edit.resolver";
import { NavPartnerComponent } from "./nav-partner/nav-partner.component";

import { CollectDeliverCreateService } from "./services/collect-deliver-create.service";
import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { EletronicRepairComponent } from "./eletronic-repair/eletronic-repair.component";
import { EletronicRepairCreateService } from "./eletronic-repair/services/eletronic-repair.create.service";
import { PartnerSupplierListService } from "./services/partner-supplier-list.service";
import { MatGridListModule, MatGridTile } from "@angular/material/grid-list";
import { CollectDeliverComponent } from './collect-deliver/collect-deliver.component';
import { CollectDeliverDashMonthComponent } from './collect-deliver-dash-month/collect-deliver-dash-month.component';
import { CollectDeliverListService, CompanyService } from "./services/collect-deliver-list.service";



@NgModule({
  declarations:
    [
      PartnerSupplierListComponent,
      PartnerCreateComponent,
      PartnerDetailsComponent,
      PartnerEditComponent,
      NavPartnerComponent,
      PartnerListListComponent,
      EletronicRepairComponent,
      CollectDeliverDashMonthComponent,
      CollectDeliverComponent,



    ],
  imports: [
    //Angular
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatGridListModule,
    //My
    MaterialModule,
    SharedModule,
    RouterModule,
    PartnerRoutingModule,
  ],
  exports: [PartnerCreateComponent],
  providers: [
    PartnerSupplierListService,
    PartnerEditResolver,
    CollectDeliverCreateService ,
    CollectDeliverResolver ,
    EletronicRepairCreateService,
    CollectDeliverListService,
    CompanyService
  ]
})

export class PartnerModule {

}
