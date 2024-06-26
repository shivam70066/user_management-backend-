import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const gaurdAuth2Guard: CanActivateFn = (route, state) => {
  const _router = inject(Router)

  // Check if token exists in localStorage
  const token = localStorage.getItem('token');

  if (token) {
    _router.navigate(['users']);
    return false;
  }

  return true;
};
