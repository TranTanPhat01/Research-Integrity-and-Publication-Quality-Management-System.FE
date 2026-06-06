// src/constants/api-endpoints.ts

export class ApiEndpoints {
  static readonly Auth = {
    Login: "/api/auth/login",
    Register: "/api/auth/register",
    RefreshToken: "/api/auth/refresh-token",
    Logout: "/api/auth/logout",
    Me: "/api/auth/me",
  };
  static readonly Papers = {
    Upload: "/api/papers/upload",
    List: "/api/papers",
    Detail: (id: number) => `/api/papers/${id}`,
  };
}
