import { BackendConfig } from "../config/BackendConfig";

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Login failed");
    }

    return res.json();
  },
};