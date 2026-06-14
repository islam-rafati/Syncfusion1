import { Injectable, computed, signal } from '@angular/core';
import { User } from '../models/user.model';
import { AuthResult } from '../models/auth.model';

// Singleton authentication state holder.
// Uses Angular Signals only — no NgRx, no BehaviorSubject.
@Injectable({ providedIn: 'root' })
export class AuthService {
  // localStorage key used to persist the token across page reloads.
  private readonly tokenKey = 'khwarizmi_token';

  // ─── Private reactive state ────────────────────────────────
  // The current user profile (null when logged out).
  private readonly currentUser = signal<User | null>(null);
  // The bearer token, seeded from storage on app start.
  private readonly token = signal<string | null>(this.readStoredToken());

  // ─── Public read-only derived signals ──────────────────────
  // Expose the user for components/templates (read-only).
  readonly user = computed(() => this.currentUser());
  // True when a token exists — drives route guards and UI.
  readonly isAuthenticated = computed(() => this.token() !== null);

  // Returns the current token. Used by the auth interceptor.
  getToken(): string | null {
    return this.token();
  }

  // Persist a successful login result into state + storage.
  setSession(result: AuthResult): void {
    this.token.set(result.token);
    this.currentUser.set(result.user);
    localStorage.setItem(this.tokenKey, result.token);
  }

  // Clear all auth state (logout).
  clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem(this.tokenKey);
  }

  // Read any previously stored token when the app boots.
  private readStoredToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
