import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth.service";


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
