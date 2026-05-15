// locationService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type LocationResponseDto = {
  id: string;
  city: string;
  state: string;
};

export const locationService = {
  getAllLocations: async (): Promise<LocationResponseDto[]> => {
    const token = authService.getToken();
    
    const res = await fetch(`${BackendConfig.springApiUrl}/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch locations");
    }
    
    return await res.json();
  },
};