import React from 'react';
import './Navbar.css';
import logo from '../assets/nidda2.png'; // Use the generated logo

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="NIDDA Logo" />
        <h1>National Integrated Death Declaration Application</h1>
      </div>
      <div className="navbar-icons">
        <i className="fas fa-bell"></i>
        <i className="fas fa-user-circle"></i>
      </div>
    </div>
  );
};

export default Navbar;
