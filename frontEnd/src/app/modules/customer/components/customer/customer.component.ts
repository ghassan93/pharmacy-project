import { Drug, ListCustomerOrders, ListDrugs, Order } from 'src/app/modules/models/models';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CustomerOrderService } from '../../services/customer-order.service';
import { catchError, map, shareReplay, throwError } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private customerOrderService:CustomerOrderService
          ) { this.userName = this.authService.getCurrentUser()?.name as string;}

allDrug :Drug[]=[]
userName:string =''
orderlist?:ListCustomerOrders ;

orderslist:Order[]=[]
Orders:Order[]=[]
page:number = 1;
test:Order[]=[]
pageEvent:PageEvent | undefined
  ngOnInit(): void {
    this.getDrugs()
  }


  logOut(): void {
    this.authService.Logout();
    this.router.navigate(['login'])
  
  }

  getDrugs(): void{
    this.customerOrderService.getDrugList().subscribe((drugList:ListDrugs<Drug>)=>{
      this.allDrug =drugList.results;
      // console.log(this.drug );
  });

}

getCustomerOrder(){
  this.customerOrderService.getcustomerordere(2).subscribe((orderslist:ListCustomerOrders)=>{
    this.orderlist=orderslist;
    this.Orders=orderslist.results;
    console.log(this.orderlist);
    console.log(this.Orders);
    console.log(this.userName);
    // this.getCustomerOrderresult()

    

  
  });
}


onChangePage(event:PageEvent){
  let page = event.pageIndex;
  page=page+1;
  this.customerOrderService.getcustomerordere(page).subscribe((orderslist:ListCustomerOrders)=>{
    this.orderlist=orderslist;
    this.Orders=orderslist.results;
  });
}
}

