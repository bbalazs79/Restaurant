import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OrderManagementComponent} from "./components/order-management/order-management.component"

const routes: Routes = [
  {
    component: OrderManagementComponent,
    path: "order",
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
