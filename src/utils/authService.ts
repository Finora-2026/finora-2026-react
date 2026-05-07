import { BackendConfig } from "../config/BackendConfig";
import {getTokenPayload} from "../jwt/jwt.ts";

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type LoginResponseDto = {
  success: boolean;
  token: string;
};

export const authService = {
  login: async (payload: LoginRequestDto): Promise<LoginResponseDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/auth/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Login failed");
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
    const token = localStorage.getItem("token");
    const payload = getTokenPayload(token);

    if (!payload) return false;

    const expired = payload.exp * 1000 < Date.now();
    if (expired) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const token = localStorage.getItem("token");
    const payload = getTokenPayload(token);

    if (!payload) return null;

    return {
      email: payload.sub,
      role: payload.role,
      userId: payload.userId,
    };
  },
};