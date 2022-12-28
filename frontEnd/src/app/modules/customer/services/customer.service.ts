import { Customer, User, DataForm } from '../../models/models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import {
  Drug,
  ListCustomerOrders,
  ListDrugs,
  Order,
  OrderedDrug,
} from 'src/app/modules/models/models';

import { environment as env } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CustomerOrderService {
  constructor(private http: HttpClient, private authService: AuthService) {
    this.code = this.authService.getCurrentUser()?.code as string;
  }
  code: string = '';
  page: number = 1;

  getDrugList(): Observable<ListDrugs<Drug>> {
    return this.http.get<ListDrugs<Drug>>(`${env.BASE_URL}drugs`);
  }

  addNewOrder(Order: Order) {
    return this.http.post<Order>(`${env.BASE_URL}orders/${this.code}/`, Order);
  }

  getCurrentOrder(page: number, status: string) {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('status', status);
    return this.http.get<ListCustomerOrders>(
      `${env.BASE_URL}orders/${this.code}/`,
      { params }
    );
  }

  getArchivdOrders(page: number, statuses: string[]) {
    let params = new HttpParams();

    params = params.append('page', String(page));
    statuses.forEach((status) => {
      params = params.append('status', status);
    });
    return this.http.get<ListCustomerOrders>(
      `${env.BASE_URL}orders/${this.code}/`,
      { params }
    );
  }

  updateUserProfile(user: DataForm): Observable<DataForm> {
    return this.http.patch<DataForm>(
      `${env.BASE_URL}users/${this.code}/`,
      user
    );
  }
}
