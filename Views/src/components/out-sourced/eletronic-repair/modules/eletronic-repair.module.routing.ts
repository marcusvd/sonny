import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SupplierListComponent } from "../../../providers/supplier/components/supplier-list/supplier-list.component";


import { PartnerCreateComponent } from "../../../partner/components/partner-create/component/partner-create.component";
import { PartnerEditComponent } from "../../../partner/components/partner-edit/partner-edit.component";
import { PartnerListListComponent } from "../../../partner/components/partner-list-list/partner-list-list.component";
import { PartnerListComponent } from "../../../partner/components/partner-list/partner-list.component";
// import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { PartnerEditResolver } from "../../resolvers/partner.edit.resolver";
import { EletronicRepairComponent } from "../component/eletronic-repair.component";





const RoutesPartner: Routes = [
  {
    path: 'partners', component: PartnerListComponent,},
      {path: 'list', component: PartnerListListComponent},


      {path: 'eletronicrepair', component: EletronicRepairComponent},
      { path: 'supplier', component: SupplierListComponent },
      { path: 'partner/new', component: PartnerCreateComponent },
      { path: 'partner/:id/edit', component: PartnerEditComponent, resolve: { Partneredit: PartnerEditResolver } },
      { path: 'partner/:id/edit', component: PartnerEditComponent },
]

@NgModule({
  imports: [RouterModule.forChild(RoutesPartner)],
  exports: [RouterModule]
})

export class EletronicRepairModuleRouting {
}
