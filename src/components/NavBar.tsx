import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="navbar-link">🏨 Hotel</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/" className="navbar-link">Početna</Link></li>
                <li><Link to="/rooms" className="navbar-link">Sobe</Link></li>
                <li><Link to="/about" className="navbar-link">O nama</Link></li>
                <li><Link to="/contact" className="navbar-link">Kontakt</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;