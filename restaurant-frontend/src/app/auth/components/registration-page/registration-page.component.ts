import { NUMBER_TYPE } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-page",
  templateUrl: "./registration-page.component.html",
  styleUrls: ["./registration-page.component.scss"]
})
export class RegistrationPageComponent implements OnInit {
  authenticationGroup: FormGroup;
  personalGroup: FormGroup;
  locationGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

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

  registrate() {
    console.log(this.authenticationGroup);
  }
}
