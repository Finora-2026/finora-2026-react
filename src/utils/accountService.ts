import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type AccountEditDto = {
  id?: string | null; // update or create new account
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
  email: string;
  pendingBalance?: number;
  postedBalance?: number;
};

export type AccountBalanceRequestDto = {
  accountId: string;
  asOfDate: string; // ISO string (important for Java LocalDateTime)
};

export type AccountBalanceResponseDto = {
  accountId: string;
  asOfDate: string;
  pendingBalance: number;
  postedBalance: number;
};

export type AccountDailyBalanceDto = {
  date: string; // ISO date (LocalDate from Java)
  pendingBalance: number;
  postedBalance: number;
};

export type AccountDateValidationResponseDto = {
  valid: boolean;
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
    payload: AccountEditDto
  ): Promise<AccountResponseDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to create a new account");
    }
    
    return await res.json();
  },
  
  updateAccount: async (
    payload: AccountEditDto
  ): Promise<AccountEditDto> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to update account");
    }
    
    return await res.json();
  },
  
  checkAccountNameAvailability: async (
    name: string
  ): Promise<boolean> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/check-name?name=${encodeURIComponent(name)}`,
      {
        headers: getHeaders(),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to check account name availability");
    }
    return await res.json();
  },
  
  getAllAccounts: async (): Promise<AccountResponseDto[]> => {
    const res = await fetch(`${BackendConfig.springApiUrl}/accounts`, {
      headers: getHeaders(),
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch all accounts");
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
  
  getAccountById: async (id: string): Promise<AccountResponseDto> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/${id}`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch account by id");
    }
    
    return await res.json();
  },
  
  getEditAccountDtoById: async (id: string): Promise<AccountEditDto> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/edit/${id}`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch edit account dto by id");
    }
    
    return await res.json();
  },
  
  getAccountBalanceAsOfDate: async (
    payload: AccountBalanceRequestDto
  ): Promise<AccountBalanceResponseDto> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/balance-as-of-date`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch account balance");
    }
    
    return await res.json();
  },
  
  getAccountDailyBalances: async (
    accountId: string,
    days: number = 30
  ): Promise<AccountDailyBalanceDto[]> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/accounts/${accountId}/daily-balance?days=${days}`,
      {
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch daily balances");
    }
    
    return await res.json();
  },
};