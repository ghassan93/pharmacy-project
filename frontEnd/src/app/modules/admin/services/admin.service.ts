import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import {
  Customer,
  ListCustomer,
  ListCustomerOrders,
} from 'src/app/modules/models/models';
import { ApiService } from 'src/app/shared/services/api.service';

import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminOrderService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  page: number = 1;

  getAllOrders(
    userName: string,
    drugName?: string,
    page?: number
  ): Observable<ListCustomerOrders> {
    let params = new HttpParams().set('pharmacyName', userName);
    if (drugName) {
      params = new HttpParams()
        .set('pharmacyName', userName)
        .set('drugName', drugName);
    }
    if (page) {
      params = new HttpParams().append('page', String(page));
    }

    return this.http.get<ListCustomerOrders>(`${env.BASE_URL}orders/all`, {
      params,
    });
  }

  getUsersList(): Observable<ListCustomer<Customer>> {
    return this.http.get<ListCustomer<Customer>>(`${env.BASE_URL}users`);
  }

  getcustomerordere(
    code: string,
    page?: number
  ): Observable<ListCustomerOrders> {
    let params = new HttpParams();

    if (page) {
      params = new HttpParams().append('page', String(page));
    }

    return this.http.get<ListCustomerOrders>(`${env.BASE_URL}orders/${code}/`, {
      params,
    });
  }

  createNewUsers(file: FormData) {
    let params = new HttpParams();

    params = new HttpParams().append('file', String(file));

    return this.http.post(`${env.BASE_URL}users/`, { params });
  }
}
