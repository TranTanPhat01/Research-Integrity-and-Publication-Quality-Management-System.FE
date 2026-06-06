import { api } from "@/lib/api";
import type { BaseResponse } from "@/types/api";
import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  LogoutRequest,
} from "@/models/auth";
import { ApiEndpoints } from "@/constants/api-endpoints";
export const authService = {
  login: (payload: LoginRequest) =>
    api.post<AuthResponse>(ApiEndpoints.Auth.Login, payload) as Promise<
      BaseResponse<AuthResponse>
    >,

  register: (payload: RegisterRequest) =>
    api.post<AuthResponse>(ApiEndpoints.Auth.Register, payload) as Promise<
      BaseResponse<AuthResponse>
    >,

  refreshToken: (payload: RefreshTokenRequest) =>
    api.post<AuthResponse>(ApiEndpoints.Auth.RefreshToken, payload) as Promise<
      BaseResponse<AuthResponse>
    >,

  logout: (payload: LogoutRequest) =>
    api.post<object>(ApiEndpoints.Auth.Logout, payload) as Promise<
      BaseResponse<object>
    >,

  me: () =>
    api.get<CurrentUserResponse>(ApiEndpoints.Auth.Me) as Promise<
      BaseResponse<CurrentUserResponse>
    >,
};

export default authService;
