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
}

export default new TransactionService();