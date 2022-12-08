import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/models';

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
@Input() 
Orders:Order[]=[]

displayedColumns: string[] = ['name', 'quantity', 'exp_date', 'drug_price','total_price'];


  constructor() { }

  ngOnInit(): void {
    
  }
  }

