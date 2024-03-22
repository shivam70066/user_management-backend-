import { HttpInterceptorFn } from '@angular/common/http';

export const addHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("interceptor chal gya")
  return next(req);
};
