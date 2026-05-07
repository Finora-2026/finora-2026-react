import { useState, type ReactNode } from "react";
import { authService } from "../../utils/authService";
import {AuthContext, type AuthUser} from "./AuthContext.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());

  const refreshAuth = () => setUser(authService.getCurrentUser());

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};