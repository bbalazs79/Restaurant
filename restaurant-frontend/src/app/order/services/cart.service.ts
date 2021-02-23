import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from 'src/app/shared/utils/api-client';
import { CheckOrderDto } from '../interfaces/order-check.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apiClient: ApiClient) { }

  public getUserCart(id: string): Observable<any>{
    /* console.log(id); */
    return this.apiClient.get('/cart/'+ id);
  }

  public addToCart(data: CheckOrderDto):Observable<any> {
    return this.apiClient.post('/cart', data);
  }

  public reoveFromCart(id:string): Observable<any>{
    return this.apiClient.get('/cart/deleteCartComponent/'+id);
  }

  public placeOrder(): Observable<any>{
    return null;
  }
}
