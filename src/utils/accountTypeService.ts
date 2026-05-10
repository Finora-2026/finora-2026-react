// accountTypeService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type AccountTypeResponseDto = {
  id: string;
  name: string;
};

export const accountTypeService = {
  getAllAccountTypes: async (): Promise<AccountTypeResponseDto[]> => {
    const token = authService.getToken();
    
    const res = await fetch(`${BackendConfig.springApiUrl}/account-types`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch account types");
    }
    
    return await res.json();
  },
};