import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, map, Observable, startWith, Subscription, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/authentication/auth.service';
import {
  Drug,
  ListDrugs,
  Order,
  OrderedDrug,
} from 'src/app/modules/models/models';
import { MessagesService } from 'src/app/shared/services/messages.service';


import Swal from 'sweetalert2';
import { CustomerOrderService } from '../../services/customer.service';
@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @ViewChild(MatTable, { static: true }) table?: MatTable<any>;
  @Input() drug: Drug[] = [];

  displayedColumns: string[] = [
    'name',
    'quantity',
    'exp_date',
    'drug_price',
    'total_price',
    'delete',
  ];

  orderForm = new FormGroup({
    drugName: new FormControl('', Validators.required),
    druQuantity: new FormControl('', Validators.required),
  });

  filteredOptions?: Observable<Drug[]>;
  code: string = '';
  numberOfAttempts = 0;
  order?: Order;
  drugSub?: Subscription;
  dataSource: any = [];
  orginDraug: OrderedDrug[] = [];
  druQuantitys: any[] = [];
  delete: any[] = [];
  
  subGetDrugs$?:Subscription
  constructor(
    private customerOrderService: CustomerOrderService,
    private authService: AuthService,
    private messages: MessagesService
  ) {
    this.code = this.authService.getCurrentUser()?.code as string;
  }

  ngOnInit(): void {
    this.getDrugs();
    this.drug;

    this.filteredOptions = this.orderForm.controls.drugName.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }
  private _filter(value: string): Drug[] {
    const filterValue = value.toLowerCase();
    return this.drug.filter((drug) =>
      drug.name.toLowerCase().includes(filterValue)
    );
  }

  addOrder() {
    let Orders: any = this.orderForm.controls.drugName.value;
    Orders = {
      ...Orders,
      origindrug: Orders.id,
      quantity: this.orderForm.controls.druQuantity.value,
    };
    if(Orders.quantity!=''){
    this.orginDraug.push(Orders);
    this.dataSource = this.orginDraug;
  
    this.table?.renderRows();
    this.orderForm.reset();
  }
  }

  creatOrder() {
    if (this.dataSource.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Create Order Please!',
      });
    } else {
  
      Swal.fire('Welcom!', 'Order in Process', 'success');
      const Order = { user: this.code, ordered_drugs: this.dataSource };
      this.customerOrderService.addNewOrder(Order).subscribe((orderlist: Order) => {
        this.order = orderlist;
        this.orginDraug = [];
        this.dataSource = [];
      });
    }
  }

  getDrugs() {
    this.subGetDrugs$=this.customerOrderService
      .getDrugList()
      .subscribe((drugList: ListDrugs<Drug>) => {
        this.drug = drugList.results;
    
      },
      (error: any) => {
        // let errorMessage: any = error.error;
        error="Couldn't  Git Drugs Now"
        this.messages.showErrors(error);
      });
  }

  deleteRowData(row_obj: any) {
    this.orginDraug = this.orginDraug.filter((value: any) => {
      this.dataSource = [];
      return value.id !== row_obj;
    });
  }
  displayFn(drug: any): string {
    return drug && drug.name ? drug.name : '';
  }

}
