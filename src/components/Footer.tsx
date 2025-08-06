import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <div>
        <p>© 2025 Hotel Booking App. Sva prava zadržana.</p>
        <p>Kontakt: info@hotelbookingapp.rs | +381 11 123 4567</p>
      </div>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  backgroundColor: '#222',
  color: '#fff',
  textAlign: 'center',
  padding: '1rem',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
};

export default Footer;
