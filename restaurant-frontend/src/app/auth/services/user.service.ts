import { Injectable } from "@angular/core";
import { EmailValidator } from "@angular/forms";
import { Observable } from "rxjs";
import { ApiClient } from "src/app/shared/utils/api-client";
import { RegistrationDto } from "../components/interfaces/registrate.dto";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private apiClient: ApiClient) {}

  public register(
    username: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string,
    city: string,
    door_number: string,
    doorbell: string,
    house_number: string,
    phone_number: string,
    storey: string,
    street: string,
    zip_code: string
  ): Observable<void> {
    return this.apiClient.post("/auth/register", {
      username: username,
      password: password,
      first_name: first_name,
      last_name: last_name,
      email: email,
      city: city,
      door_number: door_number,
      doorbell: doorbell,
      house_number: house_number,
      phone_number: phone_number,
      storey: storey,
      street: street,
      zip_code: zip_code
    });
  }
}
