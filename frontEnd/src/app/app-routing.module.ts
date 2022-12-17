
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin-guard';
import { anonymousGuard } from './core/guards/anyUser-guard';
import { CustomersGuard } from './core/guards/customer-guard';


import { HomeComponent } from './shared/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',canActivate: [anonymousGuard],
    component: HomeComponent,
  },




  { path: 'customer', canActivate: [CustomersGuard] ,loadChildren: () => import('./modules/customer/customer.module').then(m => m.CustomerModule) },

  { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
