import { Router } from '@angular/router';
// import { User } from './../models/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { Customer, User } from '../models/models';





const ACCESS_TOKEN = 'access';
const AUTH_DATA = "auth_data";
const USER_CODE='user'
const REFRESH='refresh';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser= {};
  user : User | undefined
  accessToken: string = '';
  private baseUrl = 'http://localhost:8000/api/';
  constructor(private http:HttpClient,private router: Router,){}
  

  login(code: string,password:string) {
    return this.http
      .post<User>(`${this.baseUrl}users/signin/`, { code, password})
      .subscribe((res: any) => {
        this.setUser(res.pharmacy);
        this.setAccessToken(res?.access || "");
        this.setRefreshToken(res.refresh || "");
        this.router.navigateByUrl('')
        
      });
  }





  getToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem(ACCESS_TOKEN);
    return authToken !== null ? true : false;
  }


  setAccessToken(token: string){
    localStorage.setItem(ACCESS_TOKEN, token);
    this.accessToken = token;


  }

  setUser(user: User | undefined){
    localStorage.setItem(USER_CODE, JSON.stringify(user));
    this.user = user;
  }

  setRefreshToken(token: string){
    localStorage.setItem(REFRESH, token);
    this.accessToken = token;
  }


  getCurrentUser(): User | undefined | null{
    if (this.getCurrentUserStorage()){
      return this.getCurrentUserStorage();
    }
    if (this.currentUser){
      return this.user
    }

    return undefined;
  }

  getCurrentUserStorage(): User | null {
    try{
      const user: User | null = JSON.parse(localStorage.getItem(USER_CODE) || "");
      return user;
    }
    catch(e){
      if(e instanceof SyntaxError){
        return null;
      }
    }
    return null;
  }

  isStaff ():boolean | undefined  {
    return this.getCurrentUser()?.is_staff;
    
  }
  
  isAuthenticated(): boolean {
    return this.getCurrentUser()? true: false;
  }

  Logout() {
    localStorage.clear();
  }

}
