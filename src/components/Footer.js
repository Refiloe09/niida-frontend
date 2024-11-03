import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} National Integrated Death Declaration Application (NIDDA). All rights reserved.</p>
      <div className="footer-links">
        <a href="/privacy-policy">Privacy Policy</a>
        <a href="/terms-of-service">Terms of Service</a>
        <a href="/help-center">Help Center</a>
        <a href="/contact-us">Contact Us</a>
      </div>
    </footer>
  );
};

export default Footer;
