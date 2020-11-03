import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { CarteComponent } from "../order/components/carte/carte.component";

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
        path: "carte",
        loadChildren: () =>
          import("../order/order.module").then(m => m.OrderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
