import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivdOrderComponent } from './components/archivd-order/archivd-order.component';
import { CurrentOrderComponent } from './components/current-order/current-order.component';

import { CustomerComponent } from './components/customer/customer.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditUserInfoComponent } from './components/edit-user-info/edit-user-info.component';
import { OrderComponent } from './components/order/order.component';


const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo:'/user-dashboard' },
  {path: 'user-dashboard', component: CustomerComponent},
  {path: 'order', component: OrderComponent},
  {path: 'current-order', component: CurrentOrderComponent},
  {path: 'edit-profile', component: EditProfileComponent,
  children: [
    { path: '', component: EditUserInfoComponent },
    { path: 'current-orders', component: CurrentOrderComponent },
    { path: 'archived-orders', component: ArchivdOrderComponent },
    { path: 'edit-user-info', component: EditUserInfoComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
