// transactionGroupService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type TransactionCreateDto = {
  transactionDate: string;
  amount: number;
  notes?: string;
  accountId: string;
  brandId?: string;
  locationId?: string;
  transactionTypeId?: string;
};

export type TransactionGroupCreateDto = {
  transactions: TransactionCreateDto[];
};

export type TransactionGroupCreateResponseDto = {
  success: boolean;
  groupId: string;
  message: string;
};

const getHeaders = () => {
  const token = authService.getToken();
  
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const transactionGroupService = {
  createTransactionGroup: async (
    payload: TransactionGroupCreateDto
  ): Promise<TransactionGroupCreateResponseDto> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups`,
      {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to create transaction group");
    }
    
    return await res.json();
  },
};