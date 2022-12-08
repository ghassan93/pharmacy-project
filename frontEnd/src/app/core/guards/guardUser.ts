


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';




@Injectable({
    providedIn: 'root'
  })
  export class AdminGuard {
    constructor(public router: Router, public auth: AuthService) { }
    canActivate(): boolean {
      if (this.auth.isStaff()){
        
        return true;
      }
      return false;
    }
  }


  @Injectable({
    providedIn: 'root'
  })
  export class CustomersGuard {
    constructor(public router: Router, public auth: AuthService) { }
    canActivate(): boolean {
      if (!this.auth.isStaff()){
        
        return true;
      }
      return false;
    }
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class anonymousGuard {
    constructor(public router: Router, public auth: AuthService) { }
    canActivate(): boolean {
        console.log('helloooooo');
        
      if (!this.auth.isAuthenticated()){
        return true;
      }else{
        this.auth.isStaff()? this.router.navigate(['admin']): this.router.navigate(['customers']);
        
      }
      return true;
    }
  }
  