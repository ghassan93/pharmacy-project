import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  creatUserUrl='http://127.0.0.1:8000/api/users/'
  constructor(private userService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const authToken =this.userService.getToken();
 
   if (authToken) {
    if (request.url == this.creatUserUrl){
      const requestWithToken = request.clone({
    
        headers: new HttpHeaders({
          Authorization:'Bearer ' + authToken,
          //'application':'x-www-form-urlencoded',
          'Content-Type': 'multipart/form-data',
          'enctype': 'multipart/form-data'
          
  
        }),
      });
  
      
      return next.handle(requestWithToken)
      

    }
    const requestWithToken = request.clone({
    
      headers: new HttpHeaders({
        Authorization:'Bearer ' + authToken,
        'Content-Type': 'application/json',

      }),
    });
    return next.handle(requestWithToken)
   }
    
    return next.handle(request);
  }
}
