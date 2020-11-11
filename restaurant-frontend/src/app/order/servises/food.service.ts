import { Injectable } from "@angular/core";
import { ApiClient } from "src/app/shared/utils/api-client";
import { Observable, BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Food } from "../interfaces/food";

@Injectable({
  providedIn: "root"
})
export class FoodService {
  constructor(private apiClient: ApiClient) {}

  public getFood(): Observable<Food[]> {
    return this.apiClient.get<Food[]>("/product");
  }
}
