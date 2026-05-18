// transactionGroupService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

/* =========================
   DTOs
========================= */
export type TransactionGroupResponseDto = {
  id: string;
  reportId?: string | null;
  repeatable: boolean;
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

export type AvailableReportGroupsResponse = {
  success: boolean;
  data: TransactionGroupResponseDto[];
};

export type RepeatableGroupsResponse = {
  success: boolean;
  data: TransactionGroupResponseDto[];
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
  
  // UPDATE: Repeatable
  setTransactionGroupRepeatable: async (
    groupId: string,
    repeatable: boolean
  ): Promise<{ success: boolean; message: string }> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups/${groupId}/repeatable?repeatable=${repeatable}`,
      {
        method: "PUT",
        headers: getHeaders(),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to update repeatable flag");
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
  
  // GET AVAILABLE REPORT GROUPS
  getAvailableReportGroups: async (): Promise<TransactionGroupResponseDto[]> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups/available-report-groups`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch available report groups");
    }
    const json: AvailableReportGroupsResponse = await res.json();
    if (!json.success) {
      throw new Error("Request failed (success=false)");
    }
    return json.data;
  },
  
  // GET REPEATABLE GROUPS
  getRepeatableGroups: async (): Promise<TransactionGroupResponseDto[]> => {
    const res = await fetch(
      `${BackendConfig.springApiUrl}/transaction-groups/repeatable`,
      {
        method: "GET",
        headers: getHeaders(),
      }
    );
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch repeatable groups");
    }
    const json: RepeatableGroupsResponse = await res.json();
    if (!json.success) {
      throw new Error("Request failed (success=false)");
    }
    return json.data;
  },
};