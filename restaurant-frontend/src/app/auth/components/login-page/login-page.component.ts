import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { tap } from "rxjs/operators";
import {
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    //form builder: új formgroup létrehozás
    private fb: FormBuilder,
    private router: Router
  ) {
    //validátorok létrrehozása
    this.loginForm = this.fb.group({
      username: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {}

  onClickLogin(): void {
    this.authService
      .login(this.loginForm.value.username, this.loginForm.value.password)
      .pipe(
        tap(() => {
          this.router.navigateByUrl("/");
        })
      )
      .subscribe();
  }
}
