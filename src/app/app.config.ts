import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { addTokenInterceptor } from './interceptors/add-token.interceptor';
import { provideState, provideStore } from '@ngrx/store';
import { roleReducer } from './states/roleState/role.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),{
        provide: HTTP_INTERCEPTORS,
        useClass: addTokenInterceptor,
        multi: true},
    provideAnimations(),
    provideToastr({
        positionClass: 'toast-bottom-center',
    }),
    provideStore(),
  provideState({name:'role_slug', reducer: roleReducer})]
};
