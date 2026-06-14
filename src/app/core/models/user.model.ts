// Roles a user can hold in the platform.
// Kept as a string union for strict typing (no enums needed).
export type UserRole = 'admin' | 'manager' | 'collector' | 'analyst';

// Represents an authenticated user of Khwarizmi.
export interface User {
  id: string;
  fullName: string; // الاسم الكامل للمستخدم
  email: string;
  role: UserRole;
  avatarUrl?: string; // optional profile picture URL
}
