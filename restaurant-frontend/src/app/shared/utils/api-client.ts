import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const API_URL = environment.apiUrl;

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
  api?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiClient {

  constructor(private httpClient: HttpClient) {
  }

  public get<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : API_URL;
    return this.httpClient.get<T>(api + endPoint, options);
  }

  public post<T>(endPoint: string, params?: any, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : API_URL;
    return this.httpClient.post<T>(api + endPoint, params, options);
  }

  public put<T>(endPoint: string, params?: any, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : API_URL;
    return this.httpClient.put<T>(api + endPoint, params, options);
  }

  public delete<T>(endPoint: string, options?: IRequestOptions): Observable<T> {
    const api = options && options.api ? options.api : API_URL;
    return this.httpClient.delete<T>(api + endPoint, options);
  }
}
