import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  { path: '', component: CustomerComponent },
  {path: 'user-dashboard', component: CustomerComponent},
  {path: 'order', component: OrderComponent},
  {path: 'order-list', component: OrderListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
