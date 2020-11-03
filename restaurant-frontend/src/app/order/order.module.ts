import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarteComponent } from "./components/carte/carte.component";
import { OrderRoutingModule } from "./order-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [CarteComponent],
  imports: [SharedModule, OrderRoutingModule, CommonModule],
  exports: [CarteComponent]
})
export class OrderModule {}
