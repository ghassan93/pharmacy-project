import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { outputAst } from '@angular/compiler';
import { Customer, Order } from 'src/app/modules/models/models';
import { AuthService } from 'src/app/core/authentication/auth.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent implements OnInit {
  @Input() UserOrders: Order[] = [];
  @Input() users: Customer[] = [];
  @Output() onChange = new EventEmitter<Order[]>();
  displayedColumns: string[] = [
    'name',
    'quantity',
    'exp_date',
    'drug_price',
    'total_price',
  ];
  userName: string = '';
  constructor(private authService: AuthService) {
    this.userName = this.authService.getCurrentUser()?.name as string;
  }

  ngOnInit(): void {
    this.userName;
  }
  onBackToHome() {
    this.UserOrders = [];
    this.onChange.emit(this.UserOrders);
  }
}
