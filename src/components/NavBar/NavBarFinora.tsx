import { Link, useLocation } from "react-router-dom";
import styles from "./NavBar.module.scss";
import { navItems } from "../../data/NavbarFinora.ts";
import {boxesFinoraMenu} from "../../data/BoxesFinoraMenu.ts";

export default function FinoraNavBar() {
  const { pathname } = useLocation();
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {navItems.map((item) => {
          // Find the menu data where the title includes the label name
          // e.g., Item "Accounts" matches Title "Bank accounts"
          const menuData = boxesFinoraMenu.find(box =>
            box.title.toLowerCase().includes(item.label.toLowerCase()) ||
            item.label.toLowerCase().includes(box.title.toLowerCase())
          );
          
          return (
            <div key={item.to} className={styles.navWrapper}>
              <Link
                to={item.to}
                className={item.match(pathname) ? styles.active : ""}
              >
                {item.label}
              </Link>
              
              {/* Only render dropdown if matching buttons exist */}
              {menuData && menuData.buttons && (
                <div className={styles.dropdown}>
                  {menuData.buttons.map((btn) => (
                    <Link
                      key={btn.to}
                      to={`/finora/${btn.to}`} // Prepend base path
                      className={pathname.includes(btn.to) ? styles.subActive : ""}
                    >
                      {btn.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}