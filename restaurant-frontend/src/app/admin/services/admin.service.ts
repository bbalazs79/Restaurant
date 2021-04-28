import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from 'src/app/shared/utils/api-client';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiClient: ApiClient) { }

  public getAllOrder(): Observable<any>{
    return this.apiClient.get('/order');
  }

  public orderReady(id: string): Observable<any>{
    return this.apiClient.put('/order/'+ id);
  }

  public deleteOrder(id: string): Observable<any>{
    return this.apiClient.put('/order/deleteOrder/'+ id);
  }
}
