import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  userName: string = '';
  accountNumber: string = '';
  currentChildRouteName? = '';
  constructor(public authService: AuthService, public route: ActivatedRoute,private router: Router) {
    this.userName = this.authService.getCurrentUser()?.name as string;
    this.accountNumber = this.authService.getCurrentUser()?.code as string;

  }

  ngOnInit(): void {

  }
  toggleHoverClass(id: string) {
    this.currentChildRouteName = id;
    const links = document.querySelectorAll('.sidebar a');
    links.forEach((link) => link.classList.remove('hover'));
    const element = document.getElementById(id);
    element?.classList.add('hover');
  }
}
