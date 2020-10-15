import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.scss"]
})
export class RegistrationPageComponent implements OnInit {
  authenticationGroup: FormGroup;
  personalGroup: FormGroup;
  locationGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationGroup = this._formBuilder.group({
      username: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      passwordAgain: ["", Validators.required]
    });

    this.personalGroup = this._formBuilder.group({
      first_name: ["", Validators.required],
      last_name: ["", Validators.required],
      phone_number: ["", Validators.required]
    });

    this.locationGroup = this._formBuilder.group({
      zip_code: ["", Validators.required],
      city: ["", Validators.required],
      street: ["", Validators.required],
      house_number: ["", Validators.required],
      storey: [""],
      door_number: [""],
      doorbell: [""]
    });
  }

  onClickRegistrate() {
    this.userService
      .register({
        ...this.authenticationGroup.value,
        ...this.personalGroup.value,
        ...this.locationGroup.value
      })
      .subscribe();
  }
}
