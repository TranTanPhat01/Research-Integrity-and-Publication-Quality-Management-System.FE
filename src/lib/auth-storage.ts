import type { StoredAuth } from "@/models/auth";

export const authStorage = {
  setAuth(auth: StoredAuth) {
    if (typeof window === "undefined") return;

    localStorage.setItem("accessToken", auth.accessToken);

    if (auth.refreshToken) {
      localStorage.setItem("refreshToken", auth.refreshToken);
    }

    if (auth.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    }
  },

  clearAuth() {
    if (typeof window === "undefined") return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  getAccessToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },

  getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },
};
