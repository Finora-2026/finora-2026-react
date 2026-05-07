import {Navigate, Outlet, useLocation} from "react-router-dom";
import { useAuth } from "../pages/AuthPages/AuthContext.ts";
import {isProtectedRoute} from "../config/RouteConfig.ts";

export default function ProtectedRoute() {
  // 1. Pull the reactive state from Context
  const { isLoggedIn } = useAuth();

  // Save the current location
  const location = useLocation();

  // Defensive check: If someone tries to wrap a public route
  // with this by mistake, we can handle it here.
  const isProtected = isProtectedRoute(location.pathname);

  // 2. The moment Heartbeat sets user to null, isLoggedIn becomes false.
  // React immediately re-renders this component.
  if (!isLoggedIn && isProtected) {
    // Pass the current location in the 'state' property
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  // 3. If they are logged in, show the child route (Finora)
  return <Outlet />;
}