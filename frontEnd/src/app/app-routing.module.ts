import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminGuard, anonymousGuard, CustomersGuard } from './core/guards/guardUser';
import { OrderComponent } from './components/customer/order/order.component';
import { OrderListComponent } from './components/customer/order-list/order-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',canActivate: [anonymousGuard],
    component: HomeComponent,
  },
  {path: 'customers', canActivate: [CustomersGuard], children:[
    {path: '', redirectTo: 'user-dashboard', pathMatch: 'full'},
    {path: 'user-dashboard', component: CustomerComponent},
    {path: 'order', component: OrderComponent},
    {path: 'order-list', component: OrderListComponent},

  ]},

 
  {path: 'admin', canActivate: [AdminGuard], children:[
    {path: '', redirectTo: 'admin-dashboard', pathMatch: 'full'},
    {path: 'admin-dashboard', component: AdminComponent},
    {path: 'drug-list', component: AdminOrdersComponent},
    {path: 'customers', component: AdminUsersComponent},

    
  ]},
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
