import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DrugComponent } from './components/drug/drug.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { CustomerComponent } from './components/customer/customer.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { OrderComponent } from './components/customer/order/order.component';
import { OrderListComponent } from './components/customer/order-list/order-list.component';
import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule,} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavComponent } from './core/header/nav/nav.component';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { CreateUserDialogComponent } from './components/admin/create-user-dialog/create-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    DrugComponent,
    LoginComponent,
    AdminComponent,
    CustomerComponent,
    HomeComponent,
    AdminOrdersComponent,
    AdminUsersComponent,
    OrderComponent,
    OrderListComponent,
    NavComponent,
    CreateUserDialogComponent,
    
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule
   
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
    
  }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
