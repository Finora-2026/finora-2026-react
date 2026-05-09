import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";

export default function FinoraNavBar() {
  const location = useLocation();

  const isFinoraMenu =
    location.pathname === "/finora" ||
    location.pathname === "/finora/";

  const isAnalytics = location.pathname.startsWith(
    "/finora/analytics"
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link
          className={isFinoraMenu ? styles.active : ""}
          to="/finora"
        >
          Main Menu
        </Link>

        <Link
          className={isAnalytics ? styles.active : ""}
          to="/finora/analytics"
        >
          Analytics [Testing]
        </Link>
      </div>
    </nav>
  );
}