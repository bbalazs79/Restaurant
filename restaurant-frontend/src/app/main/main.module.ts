import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [NavigationBarComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
  exports: [
  ]
})
export class MainModule { }
