import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../utils/authService";

export default function ProtectedRoute() {
  const isAuth = authService.isLoggedIn();

  if (!isAuth) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
}