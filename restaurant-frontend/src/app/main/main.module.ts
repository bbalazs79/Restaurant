import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { SharedModule } from "../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { LogoComponent } from "./logo/logo.component";
import { HeroComponent } from "./hero/hero.component";
import { MainComponent } from "./components/main/main.component";

@NgModule({
  declarations: [
    NavigationBarComponent,
    HomeComponent,
    LogoComponent,
    HeroComponent,
    MainComponent
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule],
  exports: []
})
export class MainModule {}
