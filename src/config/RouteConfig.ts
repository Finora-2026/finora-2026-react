// RouteConfig.ts
import FinoraPage from "../pages/finora/FinoraPage.tsx";

export const PROTECTED_PREFIXES = ["/finora", "/admin", "/settings"];

export const PROTECTED_ROUTES = [
  { path: "/finora", element: FinoraPage },
  // { path: "/admin", element: AdminPage },
];

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route.path));
};