import { Subscription } from 'rxjs';
import { Customer } from './../../../models/models';
import {
  Drug,
  ListCustomerOrders,
  ListDrugs,
  Order,
} from 'src/app/modules/models/models';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from '../../services/customer.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  allDrug: Drug[] = [];
  userName: string = '';
  orderlist?: ListCustomerOrders;
  orderslist: Order[] = [];
  currentOrders: Order[] = [];
  page: number = 1;
  test: Order[] = [];
  pageEvent: PageEvent | undefined;
  isLogged: boolean = true;
  subGetDrugs$?:Subscription

  constructor(
    private router: Router,
    private customerOrderService: CustomerOrderService,
    public authService: AuthService,
    private messages: MessagesService
  ) {
    this.userName = this.authService.getCurrentUser()?.name as string;
    this.authService.isLoggedIn$.subscribe((res) => (this.isLogged = res));
  }

  ngOnInit(): void {
    this.getDrugs();
  }

  getDrugs(): void {
    this.subGetDrugs$=this.customerOrderService
      .getDrugList()
      .subscribe((drugList: ListDrugs<Drug>) => {
        this.allDrug = drugList.results;
      },
      (error: any) => {
        // let errorMessage: any = error.error;
        error="Couldn't  Git Drugs Now"
        this.messages.showErrors(error);
      });
  }

  logOut(): void {
    this.authService.Logout();
    this.isLogged = !this.isLogged;
    this.router.navigate(['']);
  }
  ngOnDestroy(): void {
    this.subGetDrugs$?.unsubscribe();
  
    
  }
}
