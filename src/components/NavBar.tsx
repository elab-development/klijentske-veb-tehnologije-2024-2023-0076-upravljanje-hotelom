import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav style={navStyle}>
      <div style={logoStyle}>
        <Link to="/" style={linkStyle}>🏨 Hotel</Link>
      </div>
      <ul style={navLinksStyle}>
        <li><Link to="/" style={linkStyle}>Početna</Link></li>
        <li><Link to="/rooms" style={linkStyle}>Sobe</Link></li>
        <li><Link to="/about" style={linkStyle}>O nama</Link></li>
        <li><Link to="/contact" style={linkStyle}>Kontakt</Link></li>
      </ul>
    </nav>
  );
};

const navStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 2rem',
  backgroundColor: '#2c3e50',
  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
};

const logoStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const navLinksStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
};

const linkStyle: React.CSSProperties = {
  color: '#ecf0f1',
  textDecoration: 'none',
  fontWeight: 500,
};

export default Navbar;
