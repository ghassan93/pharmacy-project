import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getToken(){
    return localStorage.getItem('token');
  }

  setToken(){
    return localStorage.setItem('token','test jwt');
  }

  removeToken(){
    return localStorage.removeItem('token');
  }
}
