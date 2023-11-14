import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDashComponent } from "../dash/product-dash.component";
import { ProductResolver } from "../resolvers/product.resolver";
import { ManufacturerEquipamentNameComponent } from "../add/manufacturer-equipament-name/manufacturer-equipament-name.component";
import { ProductListComponent } from "../list/product-list.component";
import { ProductCreateComponent } from "../add/product-create.component";


//import { InventoryListResolve } from "./resolvers/inventory-list.resolveOLD";


const route: Routes = [

  {
    path: '', component: ProductDashComponent, children: [
      { path: 'add-product/:id', component: ProductCreateComponent, resolve: { loaded: ProductResolver } },
      { path: 'add-manufacturer-name/:id', component: ManufacturerEquipamentNameComponent },
      { path: 'list-product/:id', component: ProductListComponent, resolve:{loaded: ProductResolver} },
    ]
  },
]

@NgModule({
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule]
})


export class ProductRoutingModule { }
