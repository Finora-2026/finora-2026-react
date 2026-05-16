// transactionGroupService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

/* =========================
   DTOs
========================= */

export type TransactionGroupResponseDto = {
  id: string;
  reportId?: string | null;
  isRepeatable: boolean;
  transactions: TransactionResponseDto[];
};

export type TransactionResponseDto = {
  id: string;
  transactionGroupId: string;
  transactionDate: string;
  amount: number;
  notes?: string | null;
  accountId: string;
  brandId?: string | null;
  locationId?: string | null;
  transactionTypeId?: string | null;
  posted: boolean;
};

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

/* =========================
   Helpers
========================= */

const getHeaders = () => {
  const token = authService.getToken();
  
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/* =========================
   Service
========================= */

export const transactionGroupService = {
  // CREATE
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
  
  // UPDATE
  updateTransactionGroup: async (
    payload: TransactionGroupResponseDto
  ): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups`,
      {
        method: "PUT",
        headers: getHeaders(),
        body: JSON.stringify(payload),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to update transaction group");
    }
    
    return await res.json();
  },
  
  // GET BY ID (secure via JWT)
  getTransactionGroupById: async (
    id: string
  ): Promise<TransactionGroupResponseDto> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups/${id}`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch transaction group");
    }
    
    return await res.json();
  },
};