import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { DataForm } from 'src/app/modules/models/models';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { CustomerOrderService } from '../../services/customer.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.css'],
})
export class EditUserInfoComponent implements OnInit {
  userInfo?: DataForm;
  userName: string = '';
  accountNumber: string = '';
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(
    private customerOrderService: CustomerOrderService,
    public authService: AuthService,
    private messages: MessagesService
  ) {
    this.userName = this.authService.getCurrentUser()?.name as string;
    this.accountNumber = this.authService.getCurrentUser()?.code as string;
  }

  ngOnInit(): void {}
  updateUserProfile() {
    this.customerOrderService
      .updateUserProfile(this.userForm.getRawValue())
      .subscribe(
        (user: DataForm) => {
          this.userInfo = user;
        },
        (error: any) => {
          
          error='Erorr User Information'
          this.messages.showErrors(error);
        }
      );
  }
}
