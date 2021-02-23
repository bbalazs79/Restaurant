import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./components/cart/cart.component";
import { OrderRoutingModule } from "./order-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AuthModule } from "../auth/auth.module";
import { ProductListComponent } from './components/product-list/product-list.component';
import { MainModule } from "../main/main.module";
import { OrderDialogComponent } from './components/order-dialog/order-dialog.component';

@NgModule({
  declarations: [CartComponent, ProductListComponent, OrderDialogComponent],
  imports: [CommonModule, OrderRoutingModule, SharedModule, AuthModule, MainModule],
  exports: []
})
export class OrderModule {}
