import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class addTokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.getItem('token')
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: { Authorization: `${token}` }
      });

      return next.handle(clonedRequest);

    } else {

      return next.handle(req);
    }


  }
}

