import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

// Root application providers — standalone bootstrap (no NgModules).
export const appConfig: ApplicationConfig = {
  providers: [
    // Surfaces uncaught errors to Angular's global error listeners.
    provideBrowserGlobalErrorListeners(),

    // Lazy-loaded routing tree (see app.routes.ts).
    provideRouter(routes),

    // HTTP client with the auth interceptor that injects the bearer token
    // into every outgoing request when a session exists.
    provideHttpClient(withInterceptors([authInterceptor])),

    // NOTE: When Angular Material is added, install @angular/animations and
    // register provideAnimationsAsync() here so Material animations work.
  ],
};
