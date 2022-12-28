import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  get<T>(url: string,
    params?:
      | HttpParams
      | {
          [param: string]: string | string[];
        }
  ) {
    const endPoint = `${url}`;
    return this.http.get<T>(endPoint, {
      params,
    });
  }
}
