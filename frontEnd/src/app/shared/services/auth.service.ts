import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap, throwError } from 'rxjs';
import { User } from 'src/app/modules/models/models';






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


  private subject = new BehaviorSubject<any>(null);
  user$: Observable <User>= this.subject.asObservable()


  isLoggedIn$:Observable <boolean>; 
  isLoggedOut$:Observable <boolean>; 

  constructor(private http:HttpClient,private router: Router,){
        this.isLoggedIn$ = this.user$.pipe(map(user => !!user));
        this.isLoggedOut$=  this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));
        
        const user = localStorage.getItem(AUTH_DATA);
        if(user){
            this.subject.next(JSON.parse(user)) 
        }
    
  }






  

  login(code: string,password:string) {
    return this.http
      .post<User>(`${this.baseUrl}users/signin/`, { code, password})
      .pipe(
        tap( user => {
            this.subject.next(user);
            localStorage.setItem(AUTH_DATA,JSON.stringify(user))
        }),
        shareReplay()
    )
      .subscribe((res: any) => {
        this.setUser(res.pharmacy);
        this.setAccessToken(res?.access || "");
        this.setRefreshToken(res.refresh || "");
        this.router.navigateByUrl('')
        console.log(this.isLoggedIn$);
        
        
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
    this.subject.next(null);
    localStorage.removeItem(AUTH_DATA)
  }

}
