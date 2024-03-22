import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addHeaderInterceptor } from './interceptors/add-header.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync(),  provideHttpClient(withInterceptors([addHeaderInterceptor])),provideAnimations(),
  provideToastr({
    positionClass: 'toast-bottom-center',
  }),
  ]
};
