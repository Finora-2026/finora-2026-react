import { Link, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../utils/authService";
import "./NavBar.css";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = authService.getCurrentUser();
  const isLoggedIn = authService.isLoggedIn();

  const handleLogout = () => {
    authService.logout();
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