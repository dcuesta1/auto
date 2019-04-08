import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpResponse,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppService } from '../_services/app.service';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private local: AppService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.local.getAuthToken();

    if (token) {
      req = req.clone({ headers: req.headers.set('Authorization', token)});
    }

    if (!req.headers.has('Content-Type')) {
      req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
    }

    req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    req = req.clone({url: environment.apiUrl + req.url});

    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          token = event.headers.get('token');

          if (token) {
            this.local.setAuthToken(token);
          }
        }
      }, (err: any) => {
      let errMsg: string;

      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.local.clear();
          this.router.navigate(['/login']);
        } else {
          const error = err.message || JSON.stringify(err.error);
          errMsg = `${err.status} - ${err.statusText || ''} Details: ${err}`;
        }

      }  else {
        errMsg = err.message ? err.message : err.toString();
      }
      return throwError(errMsg);
    }));
  }
}


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
