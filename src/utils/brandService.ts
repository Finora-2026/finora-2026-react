// brandService.ts

import { BackendConfig } from "../config/BackendConfig";
import { authService } from "./authService";

export type BrandResponseDto = {
  id: string;
  name: string;
  url: string;
};

export const brandService = {
  getAllBrands: async (): Promise<BrandResponseDto[]> => {
    const token = authService.getToken();
    
    const res = await fetch(`${BackendConfig.springApiUrl}/brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg || "Failed to fetch brands");
    }
    
    return await res.json();
  },
};