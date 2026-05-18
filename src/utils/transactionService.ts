// src/services/transactionService.ts

import {BackendConfig} from "../config/BackendConfig";
import {authService} from "./authService";

export interface TransactionResponseDto {
  id: string;
  transactionGroupId: string;
  transactionDate: string;
  amount: number;
  notes: string;
  accountId: string;
  brandId: string | null;
  locationId: string | null;
  transactionTypeId: string | null;
  posted: boolean;
}

export interface TransactionSearchRequestDto {
  startDate?: string;        // ISO date: YYYY-MM-DD
  endDate?: string;
  
  minAmount?: number;
  maxAmount?: number;
  
  bankId?: string;
  accountId?: string;
  brandId?: string;
  locationId?: string;
  typeId?: string;
  
  notes?: string;
}

class TransactionService {
  
  async getPendingTransactions(): Promise<TransactionResponseDto[]> {
    const token = authService.getToken();
    const response = await fetch(
      `${BackendConfig.springApiUrl}/transactions/pending`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch pending transactions");
    }
    return await response.json();
  }
  
  async searchTransactions(
    request: TransactionSearchRequestDto
  ): Promise<TransactionResponseDto[]> {
    const token = authService.getToken();
    const response = await fetch(
      `${BackendConfig.springApiUrl}/transactions/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to search transactions");
    }
    return await response.json();
  }
}

export default new TransactionService();