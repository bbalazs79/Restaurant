import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CarteComponent } from "./components/carte/carte.component";

const routes: Routes = [
  {
    component: CarteComponent,
    path: "carte"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
