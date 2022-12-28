import { LoadingService } from './../../../../shared/services/loading.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription, catchError, throwError } from 'rxjs';
import {
  Customer,
  Drug,
  ListCustomer,
  ListCustomerOrders,
  ListDrugs,
  Order,
} from 'src/app/modules/models/models';
import { CustomerOrderService } from 'src/app/modules/customer/services/customer.service';
import { AdminOrderService } from '../../services/admin.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  showOrders = true;
  showUsers = true;
  drugName: string = '';
  userName: any;
  users: Customer[] = [];
  userResult: Customer[] = [];
  userOrderList?: ListCustomerOrders;
  allOrder?: ListCustomerOrders;
  Orders: Order[] = [];
  UserOrders: Order[] = [];
  allDrug: Drug[] = [];
  page: number = 1;
  pageEvent: PageEvent | undefined;
  public sort?: any;
  public userNameSort?: any;
  public drugSort?: any;
  private userSub?: Subscription;
  private drugSub?: Subscription;
  code: string = '';
  boolOrder: boolean = false;
  isLogged: boolean = true;
  constructor(
    private adminOrderService: AdminOrderService,
    private customerOrderService: CustomerOrderService,
    private loadingService: LoadingService,
    public authService: AuthService,
    private router: Router
  ) {
    this.authService.isLoggedIn$.subscribe((res) => (this.isLogged = res));
  }

  ngOnInit(): void {
    this.userSub = this.adminOrderService
      .getUsersList()
      .subscribe((users: ListCustomer<Customer>) => {
        this.users = users.results;
      });

    this.drugSub = this.customerOrderService
      .getDrugList()
      .subscribe((drugList: ListDrugs<Drug>) => {
        this.allDrug = drugList.results;
      });
  }

  // close button
  getusers() {
    this.userSub;
    this.userResult = this.users;
  }

  getOrderByUser(userName: string, drugName?: string, page?: number) {
    const orderByUser$ = this.adminOrderService.getAllOrders(
      userName,
      drugName,
      page
    );

    const loadOrder = this.loadingService
      .showLoaderUntilCompleted(orderByUser$)
      .subscribe((orderslist: ListCustomerOrders) => {
        this.userOrderList = orderslist;
        this.UserOrders = orderslist.results;
        this.userName = userName;
      });
  }
  getOrderByDrugName(drugName: string) {
    this.drugName = drugName;
    this.getOrderByUser(this.userName, drugName);
  }
  //pagenation
  onChangePage(event: PageEvent) {
    let page = event.pageIndex;
    page = page + 1;
    this.getOrderByUser(this.userName, this.drugName, page);
  }
  // close button
  getOrderResult() {
    this.userResult = this.users;
  }

  onChange(UserOrders: Order[] = []) {
    this.UserOrders = UserOrders;
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    if (this.drugSub) {
      this.drugSub.unsubscribe();
    }
  }

  logOut(): void {
    this.authService.Logout();
    this.isLogged = !this.isLogged;
    this.router.navigate(['login']);
  }

  addUser() {
    const ob = {} as Customer;
    this.users.push(ob);
  }
}
