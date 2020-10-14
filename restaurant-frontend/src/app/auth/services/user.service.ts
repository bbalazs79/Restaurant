import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiClient } from "src/app/shared/utils/api-client";
import { RegistrationDto } from "../components/interfaces/registrate.dto";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private apiClient: ApiClient) {}

  public register(params: RegistrationDto): Observable<void> {
    return this.apiClient.post("/auth/register", {
      params
    });
  }
}
