
// reportService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type ReportDto = {
    id: string;
    month: string; // LocalDate comes as "YYYY-MM-DD"
    isPosted: boolean;
};

export const reportService = {
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
};