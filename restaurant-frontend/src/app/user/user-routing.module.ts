import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from './components/profile/profile.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        component: ProfileComponent,
        path: 'profile'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }