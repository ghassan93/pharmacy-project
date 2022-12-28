import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { ListCustomerOrders, Order } from 'src/app/modules/models/models';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CustomerOrderService } from '../../services/customer.service';

@Component({
  selector: 'current-order',
  templateUrl: './current-order.component.html',
  styleUrls: ['./current-order.component.css'],
})
export class CurrentOrderComponent implements OnInit {
  @Input()
  Orders: Order[] = [];
  orderlist?: ListCustomerOrders;
  currentOrders: Order[] = [];
  pageEvent: PageEvent | undefined;
  displayedColumns: string[] = [
    'name',
    'quantity',
    'exp_date',
    'drug_price',
    'total_price',
  ];
  loadOrder$?:Subscription
  subCurrentOrder$?:Subscription
  constructor(
    private customerOrderService: CustomerOrderService,
    private messages: MessagesService,

    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.currentOrders;
    this.getCurrentOrder();
  }

  getCurrentOrder() {
    const customrOrder$ = this.customerOrderService.getCurrentOrder(1, 'PE');
    this.loadOrder$ = this.loadingService
      .showLoaderUntilCompleted(customrOrder$)
      .subscribe((orderslist: ListCustomerOrders) => {
        this.orderlist = orderslist;
        this.currentOrders = orderslist.results;
      },
      (error: any) => {
        // let errorMessage: any = error.error;
        error="Couldn't  Git Current Order Now"
        this.messages.showErrors(error);
      });
  }
  onChangePage(event: PageEvent) {
    let page = event.pageIndex;
    page = page + 1;
  this.subCurrentOrder$=this.customerOrderService
      .getCurrentOrder(page, 'PE')
      .subscribe((orderslist: ListCustomerOrders) => {
        this.orderlist = orderslist;
        this.currentOrders = orderslist.results;
      },
      (error: any) => {
        // let errorMessage: any = error.error;
        error='Not Another Page Order' 
        this.messages.showErrors(error);
      });
  }
  ngOnDestroy(): void {
    this.loadOrder$?.unsubscribe();
    this.subCurrentOrder$?.unsubscribe();
    
  }
}
