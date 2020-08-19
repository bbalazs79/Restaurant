import { Injectable } from '@angular/core';
import { ApiClient } from 'src/app/shared/utils/api-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
      map((response) => {
        return response.token;
      }),
    );
  }
}
