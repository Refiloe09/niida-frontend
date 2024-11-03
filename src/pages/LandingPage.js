import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import logo from '../assets/nidda2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faLock, faPenNib, faLayerGroup } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Initialize navigate for form submission

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/dashboard'); // Navigate to dashboard on form submission
  };

  return (
    <div className="flex flex-col min-h-screen bg-light-background text-text-color items-center font-primary">
      {/* Header Section */}
      <header className="text-center py-10">
        <img src={logo} alt="NIDDA Logo" className="w-32 mx-auto mb-4" /> {/* Increased logo size */}
        <h1 className="text-3xl font-bold text-primary-blue">National Integrated Death Declaration Application (NIDDA)</h1>
        <p className="text-lg text-secondary-blue mt-2">Effortlessly create and manage professional documents.</p>
      </header>

      {/* Login/Register Form */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`py-2 px-6 font-semibold rounded-t-lg transition-colors duration-300 ${
              isLogin ? 'bg-primary-blue text-white' : 'bg-gray-200 text-primary-blue'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`py-2 px-6 font-semibold rounded-t-lg transition-colors duration-300 ${
              !isLogin ? 'bg-primary-blue text-white' : 'bg-gray-200 text-primary-blue'
            }`}
          >
            Register
          </button>
        </div>
        
        <form onSubmit={handleFormSubmit} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 border border-secondary-blue rounded"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-secondary-blue rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-secondary-blue rounded"
            required
          />
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-secondary-blue rounded hover:bg-primary-blue transition"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>

      {/* Features Section */}
      <section className="text-center mt-12 px-4 mb-12">
        <h2 className="text-2xl font-bold text-primary-blue mb-6">Why Choose NIDDA?</h2> {/* Changed title to "NIDDA" */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <FeatureCard title="Professional PDF Generation" icon={faFilePdf} />
          <FeatureCard title="Secure Document Storage" icon={faLock} />
          <FeatureCard title="Easy Form Filling" icon={faPenNib} />
          <FeatureCard title="Customizable Templates" icon={faLayerGroup} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-blue text-white py-6 w-full text-center mt-auto">
        <p>&copy; {new Date().getFullYear()} National Integrated Death Declaration Application (NIDDA). All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Help Center</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
    <FontAwesomeIcon icon={icon} size="2x" className="text-secondary-blue mb-4" />
    <h3 className="text-lg font-semibold text-primary-blue">{title}</h3>
  </div>
);

export default LandingPage;
