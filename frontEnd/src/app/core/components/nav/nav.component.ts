import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { EditProfileGuard } from '../../guards/edit-profile-guard';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @ViewChild(NavComponent, { static: false }) navComponent: any;
  isLogged: boolean = true;
  navClasses: string | undefined;
  userName: string = '';
  isLoggedIn = false;
  constructor(
    public authService: AuthService,
    public router: Router,
    public editProfileGuard: EditProfileGuard
  ) {
    this.authService.isLoggedIn$.subscribe((res) => (this.isLogged = res));
    this.userName = this.authService.getCurrentUser()?.name as string;
  }

  ngOnInit(): void {
    this.userName
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url == '/home') {
          this.navClasses = 'navbar-home';
        } else {
          this.navClasses = 'navbar-user';
        }
      }
    });
    this.userName;
  }
  logOut(): void {
    this.authService.Logout();
    this.isLogged = !this.isLogged;
    this.router.navigate(['login']);
  }
}
