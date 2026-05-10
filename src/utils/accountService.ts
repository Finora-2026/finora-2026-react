import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type AccountCreateRequestDto = {
  id?: string | null;
  name: string;
  openingDate: string;
  closingDate?: string | null;
  bankId: string;
  typeId: string;
};

export type AccountResponseDto = {
  id: string;
  name: string;
  openingDate: string;
  closingDate?: string;
  bankId: string;
  type: string;
};

export const accountService = {
  createAccount: async (payload: AccountCreateRequestDto): Promise<AccountResponseDto> => {
    const token = authService.getToken();
    
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to create account");
    }
    
    return await res.json();
  },
};