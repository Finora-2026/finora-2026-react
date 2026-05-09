// RouteConfig.ts
import FinoraPage from "../pages/finora/FinoraPage.tsx";

export const PROTECTED_PREFIXES = ["/finora", "/admin", "/settings"];

export const PROTECTED_ROUTES = [
  { path: "/finora/*", element: FinoraPage },
  // { path: "/admin", element: AdminPage },
];

export const isProtectedRoute = (pathname: string): boolean => {
  return PROTECTED_ROUTES.some(route => {
    // Remove the trailing "/*" for the comparison
    const basePath = route.path.replace("/*", "");

    // Check if the current URL exactly matches the base or starts with "base/"
    // (The second check prevents /finora-extra from matching /finora)
    return pathname === basePath || pathname.startsWith(`${basePath}/`);
  });
};