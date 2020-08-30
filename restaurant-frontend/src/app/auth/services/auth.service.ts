import { Injectable } from '@angular/core';
import { ApiClient } from 'src/app/shared/utils/api-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn$ = new BehaviorSubject(false);

  constructor(private apiClient: ApiClient) { }

  public register(username: string, password: string): Observable<void> {
    return this.apiClient.post('/auth/register', {
      username,
      password
    });
  }

  /* 
   map: műveletet végez: itt lehet megvalósítani minden előzetes műveletet a response-ra
  */
  public login(username: string, password: string): Observable<string> {
    return this.apiClient.post<any>('/auth/login', {
      username,
      password
    })
    .pipe(
      tap(() => this.isLoggedIn$.next(true)),
      map((response) => {
        return response.token;
      }),
    );
  }

  public logout(): Observable<void> {
    return this.apiClient.get<void>('/auth/logout')
    .pipe(
      tap(() => this.isLoggedIn$.next(false)),
    )
  }
}
