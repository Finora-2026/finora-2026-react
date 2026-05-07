// AuthContext.ts

import { createContext, useContext } from "react";

export interface AuthUser {
  email: string;
  role: string;
  userId: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  refreshAuth: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};