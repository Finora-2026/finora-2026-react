import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useToast } from "../ToastProvider/toastContext.ts";
import {useAuth} from "../../pages/AuthPages/AuthContext.ts";
import {isProtectedRoute} from "../../config/RouteConfig.ts";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Pull everything from the Auth Context
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {

    // 1. Move to a public route first
    // This prevents ProtectedRoute from triggering a redirect to /sign-in
    const currentPath = location.pathname;
    const destination = isProtectedRoute(currentPath) ? "/" : currentPath;
    navigate(destination, { replace: true });

    // 2. Wrap the logout in a small timeout or execute it after navigation
    // This ensures the "Home" page has started rendering before the state clears
    setTimeout(() => {
      // Use the logout from context (it calls the service AND updates UI)
      logout();
      showToast("Logged out successfully", "success");
    }, 200);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link className={location.pathname === "/" ? styles.active : ""} to="/">
          Home
        </Link>

        <Link className={location.pathname === "/portfolio" ? styles.active : ""} to="/portfolio">
          Portfolio
        </Link>

        <Link className={location.pathname.startsWith("/finora") ? styles.active : ""} to="/finora">
          Finora
        </Link>
      </div>

      <div className={styles.navName}>
        {/* Use the reactive 'isLoggedIn' and 'user' variables */}
        {isLoggedIn && user ? (
          <button onClick={handleLogout}>
            {user.email} (Log Out)
          </button>
        ) : (
          <Link to="/sign-in" state={{ from: location }}>Log In</Link>
        )}
      </div>
    </nav>
  );
}