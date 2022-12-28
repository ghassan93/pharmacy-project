import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OrderGuard {
  constructor(private router: Router, private auth: AuthService) {}

  navigateToOrder() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.isStaff()) {
        this.router.navigate(['/admin/admin-dashboard']);
      } else {
        this.router.navigate(['/customer/user-dashboard']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
