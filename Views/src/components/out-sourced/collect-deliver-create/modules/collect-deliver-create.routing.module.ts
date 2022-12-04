import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { PartnerCreateComponent } from "../../partner-create/partner-create.component";
// import { PartnerEditComponent } from "../../../../../partner/partner-edit/partner-edit.component";
// import { PartnerListListComponent } from "../../partner-list-list/partner-list-list.component";
// import { PartnerListComponent } from "../../partner-list/partner-list.component";
// import { CollectDeliverResolver } from "./resolvers/collect-deliver.resolver";
import { PartnerEditResolver } from "../../resolvers/partner.edit.resolver";
import { CollectDeliverListTableAllComponent } from "../../collect-deliver-list-table-all/component/collect-deliver-dash-all.component";
import { EletronicRepairComponent } from "../../eletronic-repair/component/eletronic-repair.component";
import { PartnerListComponent } from "src/components/partner/components/partner-list/partner-list.component";
import { PartnerListListComponent } from "src/components/partner/components/partner-list-list/partner-list-list.component";
import { PartnerCreateComponent } from "src/components/partner/components/partner-create/component/partner-create.component";

import { CollectDeliverCreateResolver} from "../resolver/collect-deliver.resolver";
import { CollectDeliverCreateComponent } from "../componente/collect-deliver.component";




const routes: Routes = [
      {path: 'delivercollectall', component: CollectDeliverListTableAllComponent,},
      {path: 'delivercollect', component: CollectDeliverCreateComponent, resolve: {loaded: CollectDeliverCreateResolver} },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CollectDeliverCreateRoutingModule {
}
