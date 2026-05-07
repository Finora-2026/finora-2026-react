import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../../utils/authService.ts";
import styles from "./NavBar.module.scss";
import {useToast} from "../ToastProvider/toastContext.ts";
import {toastConfig} from "../ToastProvider/toastConfig.ts";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [token, setToken] = useState<string | null>(authService.getToken());

  useEffect(() => {
    const syncAuth = () => {
      setToken(authService.getToken());
    };

    window.addEventListener("auth-change", syncAuth);
    return () => window.removeEventListener("auth-change", syncAuth);
  }, []);

  const user = token ? authService.getCurrentUser() : null;
  const isLoggedIn = !!token;

  const handleLogout = () => {
    authService.logout();
    setToken(null);

    window.dispatchEvent(new Event("auth-change"));

    showToast("Logged out successfully, going back to home page", "success");

    setTimeout(() => {
      navigate("/", { replace: true });
    }, toastConfig.routingDelay);

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

        <Link className={location.pathname === "/finora" ? styles.active : ""} to="/finora">
          Finora
        </Link>
      </div>

      <div className={styles.navName}>
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