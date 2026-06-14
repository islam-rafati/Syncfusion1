import { User } from './user.model';

// Payload sent to the API when a user logs in.
export interface LoginCredentials {
  email: string;
  password: string;
}

// Successful authentication response returned by the API.
export interface AuthResult {
  token: string; // JWT/bearer token used for subsequent requests
  user: User; // the authenticated user's profile
}
