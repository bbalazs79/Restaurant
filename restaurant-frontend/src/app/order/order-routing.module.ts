import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CarteComponent } from "./components/carte/carte.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const routes: Routes = [
  {
    component: CarteComponent,
    path: "carte"
  },
  {
    component: ProductListComponent,
    path: ""
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
