import { Component, Input, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/models';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  @Input() userResult:Customer[]=[]
  displayedColumns: string[] = ['name', 'code', 'latitude', 'longitude'];
  constructor() { }

  ngOnInit(): void {
  
    
  }
  onBackToHome(){
    this.userResult=[]
  }
}


