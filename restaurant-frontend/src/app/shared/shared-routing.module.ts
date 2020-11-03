import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginPageComponent } from "../auth/components/login-page/login-page.component";
import { RegistrationPageComponent } from "../auth/components/registration-page/registration-page.component";
import { HomeComponent } from "../main/components/home/home.component";
import { MainComponent } from "../main/components/main/main.component";

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: "login"
  },
  {
    component: RegistrationPageComponent,
    path: "registration"
  },
  {
    component: MainComponent,
    path: "",
    children: [
      {
        component: HomeComponent,
        path: ""
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}
