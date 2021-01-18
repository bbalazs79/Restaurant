import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RegistrationPageComponent } from "./components/registration-page/registration-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { RequestHeaderInterceptor } from "./interceptors/request-header.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({
  declarations: [RegistrationPageComponent, LoginPageComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestHeaderInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
