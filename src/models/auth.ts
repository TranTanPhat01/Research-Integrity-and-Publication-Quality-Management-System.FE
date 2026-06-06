export interface AuthResponse {
  accessToken?: string;
  refreshToken?: string;
  idToken?: string;
  tokenType?: string;
  expiresIn?: number;
  fullName?: string;
  email?: string;
}

export interface CurrentUserResponse {
  fullName?: string | null;
  email?: string | null;
  sub?: string | null;
  authorities: string[];
}

// Request payload interfaces (mirror backend DTOs)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  accessToken: string;
}

export default {
  AuthResponse: undefined as unknown as AuthResponse,
  CurrentUserResponse: undefined as unknown as CurrentUserResponse,
};
