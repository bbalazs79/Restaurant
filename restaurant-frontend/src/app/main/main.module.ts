import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NavigationBarComponent } from "./components/navigation-bar/navigation-bar.component";
import { SharedModule } from "../shared/shared.module";
import { MainRoutingModule } from "./main-routing.module";
import { HomeComponent } from "./components/home/home.component";
import { MainComponent } from "./components/main/main.component";
import { LogoComponent } from "./components/logo/logo.component";
import { HeroComponent } from "./components/hero/hero.component";

@NgModule({
  declarations: [
    NavigationBarComponent,
    HomeComponent,
    LogoComponent,
    HomeComponent,
    MainComponent,
    HeroComponent
  ],
  imports: [CommonModule, SharedModule, MainRoutingModule],
  exports: []
})
export class MainModule {}
