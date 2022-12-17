import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  {path: 'admin-dashboard', component: AdminComponent},
    {path: 'drug-list', component: AdminOrdersComponent},
    {path: 'customers', component: AdminUsersComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
