import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const authToken =this.userService.getToken();
   if (authToken) {
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
