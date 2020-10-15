import { NUMBER_TYPE } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { RegistrationDto } from "../interfaces/registrate.dto";

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
      userNameValidator: ["", Validators.required],
      emailValidator: ["", Validators.required],
      passwordValidator: ["", Validators.required],
      passwordAgainValidator: ["", Validators.required]
    });

    this.personalGroup = this._formBuilder.group({
      firstNameValidator: ["", Validators.required],
      lastNameValidator: ["", Validators.required],
      phoneNumberValidator: ["", Validators.required]
    });

    this.locationGroup = this._formBuilder.group({
      zipCodeValidator: ["", Validators.required],
      cityValidators: ["", Validators.required],
      streetValidators: ["", Validators.required],
      houseNumberValidators: ["", Validators.required],
      storeyValidators: [""],
      doorNumberValidators: [""],
      doorBellValidators: [""]
    });
  }

  onClickRegistrate() {
    const params: RegistrationDto = {
      username: this.authenticationGroup.value.userNameValidator,
      password: this.authenticationGroup.value.passwordValidator,
      first_name: this.personalGroup.value.firstNameValidator,
      last_name: this.personalGroup.value.lastNameValidator,
      email: this.authenticationGroup.value.emailValidator,
      phone_number: this.personalGroup.value.phoneNumberValidator,
      zip_code: this.locationGroup.value.zipCodeValidator,
      city: this.locationGroup.value.cityValidators,
      street: this.locationGroup.value.streetValidators,
      house_number: this.locationGroup.value.houseNumberValidators,
      storey: this.locationGroup.value.storeyValidators,
      door_number: this.locationGroup.value.doorNumberValidators,
      doorbell: this.locationGroup.value.doorBellValidators
    };

    this.userService.register(params).subscribe();
  }
}
