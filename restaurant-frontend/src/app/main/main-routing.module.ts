import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";

const routes: Routes = [
  {
    component: MainComponent,
    path: "",
    children: [
      {
        component: HomeComponent,
        path: ""
      },
      {
        path: "productList",
        loadChildren: () =>
          import("../order/order.module").then(m => m.OrderModule)
      },
      {
        path: "contact",
        loadChildren: () =>
          import("../contact/contact.module").then(m => m.ContactModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
