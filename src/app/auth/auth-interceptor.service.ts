import { HttpParams } from '@angular/common/http';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        console.log('------------- In Interceptor -------');
        if (user && user.token !== null) {
          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', user.token ? user.token : ''),
          });
          console.log(modifiedReq);
          return next.handle(modifiedReq);
        } else {
          return next.handle(req);
        }
      })
    );

    // return next.handle(req);
  }
}
