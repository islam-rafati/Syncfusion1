import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

// Functional HTTP interceptor.
// Attaches the bearer token to every outgoing request when present.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = auth.getToken();

  // No active session → send the request unchanged.
  if (!token) {
    return next(req);
  }

  // Clone the request and add the Authorization header.
  const authReq = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authReq);
};
