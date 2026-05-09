import { BackendConfig } from "../config/BackendConfig";
import { getTokenPayload } from "../jwt/jwt.ts";

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  success: boolean;
  token: string;
};

/**
 * Centralized token validation logic
 * This is used internally to check if the token exists and is still valid.
 */
const getValidPayload = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const payload = getTokenPayload(token);
  if (!payload) return null;

  const expired = payload.exp * 1000 < Date.now();
  if (expired) return null;

  return payload;
};

export const authService = {
  login: async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Login failed");
    }

    const data: LoginResponseDto = await res.json();

    // Logic: If login is successful, we persist the token.
    // The UI update is now triggered by the calling component
    // running refreshAuth() from the AuthContext.
    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },

  loginDemo: async (): Promise<LoginResponseDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/auth/login-demo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Demo login failed");
    }

    const data: LoginResponseDto = await res.json();

    if (data.success && data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
  },

  isLoggedIn: () => {
    return getValidPayload() !== null;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const payload = getValidPayload();
    if (!payload) return null;

    return {
      email: payload.sub,
      role: payload.role,
      userId: payload.userId,
    };
  },
};