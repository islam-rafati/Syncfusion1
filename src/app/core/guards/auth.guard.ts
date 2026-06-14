import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Route guard: only authenticated users may proceed.
// Unauthenticated users are redirected to the login page.
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Logged in → allow navigation.
  if (auth.isAuthenticated()) {
    return true;
  }

  // Not logged in → redirect to the login route.
  return router.createUrlTree(['/auth/login']);
};
