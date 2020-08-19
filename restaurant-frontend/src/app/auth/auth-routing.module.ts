import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        component: LoginPageComponent,
        path: 'login'
    },
    {
        component: RegistrationPageComponent,
        path: 'registration'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }