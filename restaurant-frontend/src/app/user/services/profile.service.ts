import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from 'src/app/shared/utils/api-client';
import { BasicCheckDto } from '../interfaces/checkPass.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiClient: ApiClient) { }

  public getProfile(): Observable<any> {
    return this.apiClient.get('/profile');
  }

  public updateUserProfile(id:string, data: any){
    //console.log(data);
    return this.apiClient.put('/profile/'+ id, data);
  }

  public checkPass(data: BasicCheckDto){
    return this.apiClient.post('/auth',data);
  }
}
