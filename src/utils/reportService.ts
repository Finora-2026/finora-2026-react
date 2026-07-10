
// reportService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type ReportDto = {
    id: string;
    month: string; // LocalDate comes as "YYYY-MM-DD"
    isPosted: boolean;
};

export type ReportStatus = "NEW" | "PENDING" | "EMPTY" | "POSTED";
export type ReportCreateDto = {
    id: string | null;
    status: ReportStatus;
};

export type TransactionTypeSummaryDto = {
    transactionTypeId: string;
    transactionTypeName: string;
    totalAmount: number;
};

export type AccountSummaryDto = {
    accountId: string;
    accountName: string;
    bankId: string;
    bankName: string;
    accountType: string;
    balance: number;
};

export type ReportDetailsDto = {
    currentReportId: string;
    previousReportId: string | null;
    nextReportId: string | null;
    
    month: string; // LocalDate comes as "YYYY-MM-DD"
    reportStatus: ReportStatus;
    
    typeSummary: TransactionTypeSummaryDto[];
    accountSummary: AccountSummaryDto[];
};

export type LoadAllTransactionsResponseDto = {
    message: string;
    loadedGroupCount: number;
};

export const reportService = {
    
    // Create a new report from BE, return pending report if one exists
    createNewReport: async (): Promise<ReportCreateDto> => {
        const token = authService.getToken();
        const res = await fetch(
          `${BackendConfig.springApiUrl}/reports/create`,
          {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }
        );
        
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to create a new report");
        }
        
        return await res.json();
    },
    
    getReportDetails: async (reportId: string): Promise<ReportDetailsDto | null> => {
        const token = authService.getToken();
        
        const res = await fetch(
          `${BackendConfig.springApiUrl}/reports/${reportId}`,
          {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          }
        );
        
        if (res.status === 404) {
            return null;
        }
        
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to fetch report details");
        }
        
        return await res.json();
    },
    
    getCurrentPendingReport: async (): Promise<ReportDto | null> => {
        const token = authService.getToken();
        const res = await fetch(
            `${BackendConfig.springApiUrl}/reports/current-pending`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to fetch current pending report");
        }

        return await res.json();
    },

    getLastPostedReport: async (): Promise<ReportDto | null> => {
        const token = authService.getToken();
        const res = await fetch(
            `${BackendConfig.springApiUrl}/reports/last-posted`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.status === 404) {
            return null;
        }

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to fetch last posted report");
        }

        return await res.json();
    },

    loadAllTransactions: async (
        reportId: string
    ): Promise<LoadAllTransactionsResponseDto> => {
        const token = authService.getToken();
        const res = await fetch(
            `${BackendConfig.springApiUrl}/reports/${reportId}/load-all-transactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!res.ok) {
            const error = await res.json().catch(() => null);
            throw new Error(error?.message || "Failed to load transactions into report");
        }

        return await res.json();
    },
    
    downloadReportTransactions: async (reportId: string): Promise<void> => {
        const token = authService.getToken();
        
        const res = await fetch(
          `${BackendConfig.springApiUrl}/reports/${reportId}/download`,
          {
              method: "GET",
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
        );
        
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Failed to download report transactions");
        }
        
        const blob = await res.blob();
        
        const url = window.URL.createObjectURL(blob);
        
        const link = document.createElement("a");
        link.href = url;
        link.download = `report-${reportId}-transactions.csv`;
        
        document.body.appendChild(link);
        link.click();
        
        link.remove();
        window.URL.revokeObjectURL(url);
    },
};
