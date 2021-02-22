import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiClient } from 'src/app/shared/utils/api-client';

@Injectable({
  providedIn: 'root'
})
export class CarteService {

  constructor(private apiClient: ApiClient) { }

  public getUserCarte(id: string): Observable<any>{
    console.log(id);
    return this.apiClient.get('/cart/'+ id);
  }
}
