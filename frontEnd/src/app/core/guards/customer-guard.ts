import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomersGuard {
  constructor(public router: Router, public auth: AuthService) {}
  canActivate(): boolean {
    console.log(
      'CustomersGuard',
      this.auth.isAuthenticated() && !this.auth.isStaff()
    );

    if (this.auth.isAuthenticated() && !this.auth.isStaff()) {
      return true;
    }
    return false;
  }
}
