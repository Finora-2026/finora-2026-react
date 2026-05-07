import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/AuthPages/AuthContext.ts";

export default function ProtectedRoute() {
  // 1. Pull the reactive state from Context
  const { isLoggedIn } = useAuth();

  // 2. The moment Heartbeat sets user to null, isLoggedIn becomes false.
  // React immediately re-renders this component.
  if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  // 3. If they are logged in, show the child route (Finora)
  return <Outlet />;
}