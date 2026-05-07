import { useState, useEffect, type ReactNode } from "react";
import { authService } from "../../utils/authService";
import { AuthContext, type AuthUser } from "./AuthContext.ts";
import { useToast } from "../../components/ToastProvider/toastContext.ts";
import {getTokenPayload} from "../../jwt/jwt.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(authService.getCurrentUser());
  const { showToast } = useToast();

  const refreshAuth = () => setUser(authService.getCurrentUser());

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  // Heartbeat check: Every 20 seconds
  useEffect(() => {
    const checkTokenStatus = () => {
      const token = authService.getToken();
      if (!token) return;

      const payload = getTokenPayload(token);
      if (!payload) return;

      const currentTime = Date.now() / 1000;
      const timeLeft = payload.exp - currentTime;

      if (timeLeft <= 0) {
        // 1. Token is officially dead
        logout();
        showToast("Your session has expired. Please log in again.", "error");
      } else if (timeLeft < 60 && timeLeft > 40) {
        // 2. Token expires in less than a minute
        // (We check range so the toast doesn't pop up every 20s)
        showToast("Your session will expire in less than a minute! [REQUEST TOKEN REFRESH]", "error");
      }
    };

    // Run once on mount, then every 20 seconds
    checkTokenStatus();
    const interval = setInterval(checkTokenStatus, 20000);

    return () => clearInterval(interval);
  }, [user]); // Re-run effect when user logs in/out

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, refreshAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};