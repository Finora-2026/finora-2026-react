
// bankService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type BankResponseDto = {
  id: string;
  name: string;
};

export const bankService = {
  getAllBanks: async (): Promise<BankResponseDto[]> => {
    const token = authService.getToken();
    
    const res = await fetch(`${BackendConfig.springApiUrl}/banks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch banks");
    }
    
    return await res.json();
  },
};