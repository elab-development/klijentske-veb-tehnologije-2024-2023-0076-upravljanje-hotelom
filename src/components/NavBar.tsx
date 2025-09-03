import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false); // mobilni meni

  const isActive = (p: string) => (pathname === p ? 'navbar-link active' : 'navbar-link');

  function handleLogout() {
    logout();
    navigate('/', { replace: true });
    setOpen(false);
  }

  return (
    <nav className="navbar" role="navigation" aria-label="Glavna navigacija">
      <div className="navbar-logo">
        <Link to="/" className="navbar-link" onClick={() => setOpen(false)}>🏨 Hotel</Link>
      </div>

      <button
        type="button"
        className="navbar-toggle"
        aria-expanded={open}
        aria-controls="navbar-links"
        onClick={() => setOpen(v => !v)}
      >
        {open ? 'Zatvori' : 'Meni'}
      </button>

      <ul id="navbar-links" className={`navbar-links ${open ? 'open' : ''}`}>
        <li><Link to="/" className={isActive('/')} onClick={() => setOpen(false)}>Početna</Link></li>
        <li><Link to="/rooms" className={isActive('/rooms')} onClick={() => setOpen(false)}>Sobe</Link></li>
        <li><Link to="/about" className={isActive('/about')} onClick={() => setOpen(false)}>O nama</Link></li>
        <li><Link to="/contact" className={isActive('/contact')} onClick={() => setOpen(false)}>Kontakt</Link></li>

        {!user ? (
          <>
            <li><Link to="/login" className={isActive('/login')} onClick={() => setOpen(false)}>Prijava</Link></li>
            <li><Link to="/register" className={isActive('/register')} onClick={() => setOpen(false)}>Registracija</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/profile" className={isActive('/profile')} onClick={() => setOpen(false)}>Profil</Link></li>
            <li>
              <button
                type="button"
                className="navbar-link"
                onClick={handleLogout}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                Odjava
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;