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
  closingDate?: string | null;
  bankId: string;
  bankName: string;
  type: string;
  pendingBalance?: number;
  postedBalance?: number;
};

const getHeaders = () => {
  const token = authService.getToken();
  
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const accountService = {
  createAccount: async (
    payload: AccountCreateRequestDto
  ): Promise<AccountResponseDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to create account");
    }
    
    return await res.json();
  },
  
  getAllAccounts: async (): Promise<AccountResponseDto[]> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      headers: getHeaders(),
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch accounts");
    }
    
    return await res.json();
  },
  
  getActiveAccounts: async (): Promise<AccountResponseDto[]> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/active`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch active accounts");
    }
    
    return await res.json();
  },
  
  getInactiveAccounts: async (): Promise<AccountResponseDto[]> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/inactive`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      throw new Error("Failed to fetch inactive accounts");
    }
    
    return await res.json();
  },
};