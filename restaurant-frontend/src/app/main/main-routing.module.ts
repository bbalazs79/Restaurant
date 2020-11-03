import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { HomeComponent } from "./components/home/home.component";
import { CarteComponent } from "../order/components/carte/carte.component";

const routes: Routes = [
  {
    component: HomeComponent,
    path: "",
    children: [
      {
        component: NavigationBarComponent,
        path: ""
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
