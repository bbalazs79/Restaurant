import { Injectable } from "@angular/core";
import { ApiClient } from "src/app/shared/utils/api-client";
import { Observable, BehaviorSubject, EMPTY } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject(false);

  constructor(private apiClient: ApiClient) {
    if(localStorage.getItem('token')){
      this.tryAuth().subscribe();
    }
  }
  /* 
   map: műveletet végez: itt lehet megvalósítani minden előzetes műveletet a response-ra
  */
  public login(username: string, password: string): Observable<string> {
    return this.apiClient
      .post<any>("/auth/login", {
        username,
        password
      })
      .pipe(
        tap(() => this.isLoggedIn$.next(true)),
        map(response => {
          return response.token;
        })
      );
  }

  public getCurrentUserName(username: string): Observable<void>{
    return this.apiClient.post("/profile/getMyName", {username})
    .pipe(
      map(response=>
        localStorage.setItem("UserName",String(response))
        ));
  }

  public logout(): Observable<void> {
    return this.apiClient
      .get<void>("/auth/logout")
      .pipe(tap(() => this.isLoggedIn$.next(false)));
  }

  public tryAuth(): Observable<void>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token' || '')}`
    });
    return this.apiClient.get<void>('/auth',{headers}).pipe(
      tap(()=>this.isLoggedIn$.next(true)),
      catchError(()=>{
        this.isLoggedIn$.next(false);
        return EMPTY;
      })
    );
  }
}
