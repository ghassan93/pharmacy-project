import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './components/customer/customer.component';

import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from '@angular/material/table';
import {MatAutocompleteModule,} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderComponent } from './components/order/order.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ArchivdOrderComponent } from './components/archivd-order/archivd-order.component';
import { CurrentOrderComponent } from './components/current-order/current-order.component';
import { EditUserInfoComponent } from './components/edit-user-info/edit-user-info.component';


@NgModule({
  declarations: [
    CustomerComponent,
    OrderComponent,
    EditProfileComponent,
    ArchivdOrderComponent,
    CurrentOrderComponent,
    EditUserInfoComponent

  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,


  ]
})
export class CustomerModule { }
