import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class addTokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token') // Get localStorage service
    if (token) {
      // Clone request and add Authorization header
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `${token}` }
      });

      return next.handle(clonedRequest);

    } else {
      console.warn('No token found in local storage!');
      return next.handle(req);
    }



    return next.handle(req);
  }
}

