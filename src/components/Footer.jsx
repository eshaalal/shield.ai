import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">
        Made with Love by Esha Lal &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
