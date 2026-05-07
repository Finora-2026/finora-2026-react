import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { useToast } from "../ToastProvider/toastContext.ts";
import {useAuth} from "../../pages/AuthPages/AuthContext.ts";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  // Pull everything from the Auth Context
  const { user, isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    // Use the logout from context (it calls the service AND updates UI)
    logout();

    showToast("Logged out successfully, going back to home page", "success");
    navigate("/", { replace: true });
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
          <Link to="/sign-in">Log In</Link>
        )}
      </div>
    </nav>
  );
}