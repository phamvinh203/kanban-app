export interface AuthForm {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}
