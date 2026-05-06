import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../../utils/authService.ts";
import "./NavBar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

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
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className={location.pathname === "/" ? "active" : ""} to="/">
          Home
        </Link>

        <Link className={location.pathname === "/portfolio" ? "active" : ""} to="/portfolio">
          Portfolio
        </Link>

        <Link className={location.pathname === "/finora-login" ? "active" : ""} to="/finora-login">
          Finora
        </Link>
      </div>

      <div className="nav-name">
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