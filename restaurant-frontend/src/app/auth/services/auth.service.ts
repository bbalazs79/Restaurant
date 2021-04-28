import { Injectable } from "@angular/core";
import { ApiClient } from "src/app/shared/utils/api-client";
import { Observable, BehaviorSubject, EMPTY } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { User } from "src/app/user/interfaces/user.interface";
import { ProfileService } from "src/app/user/services/profile.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public isLoggedIn$ = new BehaviorSubject(false);
  public currUserName$ = new BehaviorSubject('Anonim Felhasználó');
  public currentUser$: BehaviorSubject<User>;
  public userPremission$: BehaviorSubject<string> = new BehaviorSubject('user');

  constructor(private apiClient: ApiClient, private profileService: ProfileService) {
    if(localStorage.getItem('token')){
      this.tryAuth().subscribe();
      this.getCurrentUserName().subscribe();
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
        switchMap(response => {
          localStorage.setItem('token', response.token);
          this.isLoggedIn$.next(true);
          return this.getCurrentUserName();
        }),
        tap(()=>{
          this.profileService.getProfile().pipe(
            tap((response)=>{
              //console.log(response.role.role);
              this.userPremission$.next(response.role.role);
              console.log(this.userPremission$.value);
              this.currentUser$ = response;
              //console.log(this.currentUser$);
            })
          ).subscribe();
        })
      );
  }

  public getCurrentUserName(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token' || '')}`,
    });
    return this.apiClient.get('/profile/getMyName',{headers, responseType: 'text' as 'json'})
    .pipe(tap(response=>{
      this.currUserName$.next(`${response}`);
      localStorage.setItem('currUserName', `${response}`);
    }));
  }

  public logout(): Observable<void> {
    return this.apiClient
      .get<void>("/auth/logout")
      .pipe(
        tap(() => this.isLoggedIn$.next(false)),
        map(()=> localStorage.removeItem('token'))
      );
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
