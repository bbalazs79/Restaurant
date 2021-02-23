import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CartComponent } from "./components/cart/cart.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const routes: Routes = [
  {
    component: CartComponent,
    path: "cart"
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
