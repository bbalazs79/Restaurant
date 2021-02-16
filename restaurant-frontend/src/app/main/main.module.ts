import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { SharedModule } from "../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { LogoComponent } from "./components/logo/logo.component";
import { HeroComponent } from "./components/hero/hero.component";
import { HeaderComponent } from "./components/header/header.component";
import { AboutComponent } from "./components/about/about.component";
import { EvaluationComponent } from "./components/evaluation/evaluation.component";
import { OrderComponent } from "./components/order/order.component";
import { AuthModule } from "../auth/auth.module";

@NgModule({
  declarations: [
    NavigationBarComponent,
    HeaderComponent,
    HomeComponent,
    LogoComponent,
    HomeComponent,
    MainComponent,
    HeroComponent,
    AboutComponent,
    EvaluationComponent,
    OrderComponent
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule, AuthModule],
  exports: [HeaderComponent]
})
export class MainModule {}
