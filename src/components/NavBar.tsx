import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          Home
        </Link>

        <Link className={location.pathname === '/portfolio' ? 'active' : ''} to="/portfolio">
          Portfolio
        </Link>

        <Link className={location.pathname === '/finora-login' ? 'active' : ''} to="/finora-login">
          Finora
        </Link>
      </div>

      <div className="nav-name">Bellamy Phan [User]</div>
    </nav>
  )
}