import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer, Drug, ListCustomer, ListCustomerOrders, ListDrugs, Order, OrderedDrug } from 'src/app/modules/models/models';
import { CustomerOrderService } from 'src/app/modules/customer/services/customer-order.service';

import { AdminOrderService } from '../../services/admin.service';
import { AuthService } from 'src/app/shared/services/auth.service';





@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  showOrders = true;
  showUsers = true;
  drugName: string = ''

  userName: any
  users: Customer[] = []
  userResult: Customer[] = []

  userOrderList?: ListCustomerOrders
  allOrder?: ListCustomerOrders;
  Orders: Order[] = []
  UserOrders: Order[] = []
  allDrug: Drug[] = []
  page: number = 1;

  pageEvent: PageEvent | undefined

  public sort?: any;
  public userNameSort?: any;
  public drugSort?: any;
  private routeSub?: Subscription;


  constructor(private authService: AuthService,
    private adminOrderService: AdminOrderService,
    private activatedRoute: ActivatedRoute,
    private customerOrderService: CustomerOrderService


  ) { }
  code: string = ''
  ngOnInit(): void {
    this.getAllUsers()
    this.getDrugs()


  }
  getDrugs(): void {
    this.customerOrderService.getDrugList().subscribe((drugList: ListDrugs<Drug>) => {
      this.allDrug = drugList.results;
      // console.log(this.drug );
    });

  }


  getAllUsers() {
    this.adminOrderService.getUsersList().subscribe((users: ListCustomer<Customer>) => {
      this.users = users.results
      console.log(this.users);

    });
  }
  // close button
  getusers() {
    this.getAllUsers()
    this.userResult = this.users

  }

  getOrderByUser(userName: string, drugName?: string, page?: number) {
   
    this.adminOrderService.getAllOrders(userName, drugName, page).subscribe((orderslist: ListCustomerOrders) => {
      this.userOrderList = orderslist;
      this.UserOrders = orderslist.results;
      this.userName = userName;
      console.log(this.UserOrders);
      

    });
  }
  getOrderByDrugName(drugName: string) {
    
    this.drugName = drugName
    this.getOrderByUser(this.userName, drugName)
  }
  //pagenation
  onChangePage(event: PageEvent) {
    let page = event.pageIndex;
    page = page + 1;
    this.getOrderByUser(this.userName, this.drugName, page)
  }
  // close button
  getOrderResult() {

    this.userResult = this.users

  }


  // filter orders by user as (test)  use TypeScript withou api filters
  filterOrderByUser(sort: string, page?: number) {
    this.adminOrderService.getcustomerordere(sort, page)

      .subscribe((orderslist: ListCustomerOrders) => {
        this.userOrderList = orderslist;
        this.UserOrders = orderslist.results;
        this.sort = sort;
        console.log(this.UserOrders);

      });
  }

  onChange(UserOrders: Order[] = []) {
    this.UserOrders = UserOrders

  }

  openDialog(x: any, y: any) {

  }


}
