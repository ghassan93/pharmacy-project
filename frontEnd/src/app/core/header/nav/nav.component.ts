import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 ;

  constructor(private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
  }
  logOut(): void {
    this.authService.Logout();
    this.router.navigate(['login'])
  
  }
}
