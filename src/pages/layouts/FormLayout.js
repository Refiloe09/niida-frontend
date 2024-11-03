import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/nidda2.png'; // Update with your logo path
import Footer from '../../components/Footer';
import './FormLayout.css';

const FormLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Medical Certification of Death', path: '/form-filling/medical-practitioner' },
    { name: 'Deceased Information', path: '/form-filling/deceased' },
    { name: 'Funeral Arrangements and Burial Details', path: '/form-filling/funeral-undertaker' },
    { name: 'Informant’s Certification of Identity', path: '/form-filling/informant' },
  ];

  return (
    <div className="layout-container flex h-screen bg-light-background text-text-color">
      {/* Sidebar */}
      <div className="sidebar w-64 bg-primary-blue text-white flex flex-col">
        <div className="sidebar-logo flex items-center justify-center py-6">
          <img src={logo} alt="App Logo" className="w-24 h-24" />
        </div>

        <nav className="sidebar-nav flex-grow">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Additional Links */}
        <div className="sidebar-footer flex flex-col items-center py-4">
          <button
            className="sidebar-button w-11/12 py-2 text-white rounded mb-2 flex items-center justify-center"
            onClick={() => navigate('/dashboard')}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
            Back to Dashboard
          </button>
          <button
            className="sidebar-button w-11/12 py-2 text-white rounded flex items-center justify-center"
            onClick={() => navigate('/')}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Log Out
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content flex-1 flex flex-col">
        <header className="content-header p-4 bg-primary-blue text-white text-xl font-semibold text-center">
          National Integrated Death Declaration Application
        </header>

        <main className="content-main flex-1 p-12 overflow-y-auto bg-white rounded-lg shadow-lg mx-auto max-w-5xl">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default FormLayout;
