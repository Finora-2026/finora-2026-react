import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'

export default function Navbar() {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-left">Bellamy Phan</div>

      <div className="nav-links">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">
          Home
        </Link>

        <Link className={location.pathname === '/portfolio' ? 'active' : ''} to="/portfolio">
          Portfolio
        </Link>
      </div>
    </nav>
  )
}