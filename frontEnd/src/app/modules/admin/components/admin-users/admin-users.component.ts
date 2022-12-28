import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from 'src/app/modules/models/models';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit {
  @Input() userResult: Customer[] = [];
  displayedColumns: string[] = ['name', 'code', 'latitude', 'longitude'];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}
  onBackToHome() {
    this.userResult = [];
  }

  openDialog() {
    this.dialog.open(CreateUserDialogComponent);
  }
}
