import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Početna</Link></li>
        <li><Link to="/rooms">Sobe</Link></li>
        <li><Link to="/reservation">Rezervacija</Link></li>
        <li><Link to="/contact">Kontakt</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
