export interface AuthUser {
  id: number;
  username: string;
  email: string;
}

export interface AuthResponse {
  message: string;
  user: AuthUser;
  access: string;
  refresh: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
}

export interface ProfileUpdatePayload {
  username?: string;
  email?: string;
}

export interface ProfileUpdateResponse {
  message: string;
  user: UserProfile;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password2: string;
}
