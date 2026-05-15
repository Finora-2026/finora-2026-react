// transactionTypeService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type TransactionTypeDto = {
  id: string;
  name: string;
};

export const transactionTypeService = {
  getAllTransactionTypes: async (): Promise<TransactionTypeDto[]> => {
    const token = authService.getToken();
    
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-types`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch transaction types");
    }
    
    return await res.json();
  },
};