import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 ;
 isLogged:boolean=true;;
  constructor(public authService:AuthService,
    private router:Router) {
      this.authService.isLoggedIn$.subscribe((res) => this.isLogged = res);
     }

  ngOnInit(): void {
    console.log(this.isLogged);
  }
  logOut(): void {
    this.authService.Logout();
    this.isLogged = !this.isLogged;
    this.router.navigate(['login'])
  
  }
}
