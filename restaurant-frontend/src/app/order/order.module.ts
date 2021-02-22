import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CarteComponent } from "./components/carte/carte.component";
import { OrderRoutingModule } from "./order-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../auth/auth.module";
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainModule } from "../main/main.module";

@NgModule({
  declarations: [CarteComponent, ProductListComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule, AuthModule, MainModule],
  exports: []
})
export class OrderModule {}
