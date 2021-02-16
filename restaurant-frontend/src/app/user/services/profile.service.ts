import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from 'src/app/shared/utils/api-client';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiClient: ApiClient) { }

  public getProfile(): Observable<any> {
    return this.apiClient.get('/profile');
  }

  public updateUserProfile(id:string, data: any){
    return this.apiClient.put('/profile/'+ id, data);
  }
}
