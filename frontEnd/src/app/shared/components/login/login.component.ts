import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth:AuthService) {

    this.form = fb.group({
      code: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    
    const val = this.form.value;
    this.auth.login(val.code, val.password)
    
    
      

  



  }

}
