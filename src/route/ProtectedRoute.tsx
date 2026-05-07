import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { authService } from "../utils/authService";
import {useAuth} from "../pages/AuthPages/AuthContext.ts";

export default function ProtectedRoute() {
  const { isLoggedIn, refreshAuth } = useAuth();

  // If the service says we are logged out (expired),
  // but the Context still thinks we are logged in:
  const actualAuthStatus = authService.isLoggedIn();

  useEffect(() => {
    if (!actualAuthStatus && isLoggedIn) {
      // The token expired! Tell the context to sync up.
      refreshAuth();
    }
  }, [actualAuthStatus, isLoggedIn, refreshAuth]);

  if (!actualAuthStatus) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}