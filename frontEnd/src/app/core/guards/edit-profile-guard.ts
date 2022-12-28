import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileGuard {
  constructor(private router: Router, private auth: AuthService) {}

  navigateToProfile() {
    if (this.auth.isAuthenticated()) {
      if (this.auth.isStaff()) {
        this.router.navigate(['/admin/edit-profile']);
      } else {
        this.router.navigate(['/customer/edit-profile']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
