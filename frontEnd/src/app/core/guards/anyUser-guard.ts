import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";


@Injectable({
    providedIn: 'root'
  })
  export class anonymousGuard {
    constructor(public router: Router, public auth: AuthService) { }
    canActivate(): boolean {
        
        
      if (!this.auth.isAuthenticated()){
        return true;
      }else{
        this.auth.isStaff()? this.router.navigate(['admin']): this.router.navigate(['customer']);
        
      }
      return true;
    }
  }
  