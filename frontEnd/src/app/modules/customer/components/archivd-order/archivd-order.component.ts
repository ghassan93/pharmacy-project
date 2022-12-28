import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListCustomerOrders, Order } from 'src/app/modules/models/models';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { CustomerOrderService } from '../../services/customer.service';
import { MessagesService } from 'src/app/shared/services/messages.service';

@Component({
  selector: 'app-archivd-order',
  templateUrl: './archivd-order.component.html',
  styleUrls: ['./archivd-order.component.css'],
})
export class ArchivdOrderComponent implements OnInit {
  @Input() ArchivedOrders: Order[] = [];
  Archivedlist?: ListCustomerOrders;
  pageEvent: PageEvent | undefined;
  subArchivdOrder?:Subscription
  loadOrder$?:Subscription
  displayedColumns: string[] = [
    'name',
    'quantity',
    'exp_date',
    'drug_price',
    'total_price',
    'status',
  ];

  constructor(
    private customerOrderService: CustomerOrderService,
    private loadingService: LoadingService,
    private messages: MessagesService
  ) {}
  ngOnInit(): void {
    this.getArchivdOrder();
  }

  getArchivdOrder() {
    const customrOrder$ = this.customerOrderService.getArchivdOrders(1, [
      'CA',
      'CO',
      'RE',
    ]);
    this.loadOrder$ = this.loadingService
      .showLoaderUntilCompleted(customrOrder$)
      .subscribe((orderslist: ListCustomerOrders) => {
        this.Archivedlist = orderslist;
        this.ArchivedOrders = orderslist.results;
        console.log((this.ArchivedOrders = orderslist.results));
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
  this.subArchivdOrder=  this.customerOrderService
      .getCurrentOrder(page, 'PE')
      .subscribe((orderslist: ListCustomerOrders) => {
        this.Archivedlist = orderslist;
        this.ArchivedOrders = orderslist.results;
      },
      (error: any) => {
        // let errorMessage: any = error.error;
        error='Not Another Page Order' 
        this.messages.showErrors(error);
      });
  }
  ngOnDestroy(): void {
    this.loadOrder$?.unsubscribe();
    this.subArchivdOrder?.unsubscribe();

  }
}
