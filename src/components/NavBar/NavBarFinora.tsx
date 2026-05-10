import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";
import {navItems} from "../../data/NavbarFinora.ts";

export default function FinoraNavBar() {
  
  const pathname = useLocation().pathname;
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={item.match(pathname) ? styles.active : ""}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}