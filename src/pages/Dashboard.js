import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecentSubmissionsTable from '../components/RecentSubmissionsTable';
import HelpfulTips from '../components/HelpfulTips';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Top Sections with Welcome, Form Selection, and Helpful Tips */}
        <div className="top-sections">
          {/* Welcome Section */}
          <section className="quick-stats">
            <h2>Welcome back, Dr. Smith!</h2>
            <div className="stats-grid">
              <div className="stat-card">Forms Completed: 50</div>
              <div className="stat-card">Pending Submissions: 5</div>
              <div className="stat-card">Notifications: 3</div>
            </div>
          </section>

          {/* Form Selection */}
          <section className="form-selection">
            <h2>Select a Form to Start</h2>
            <div className="form-buttons">
              <button
                className="form-button"
                onClick={() => navigate('/form-filling/medical-practitioner')}
              >
                <i className="fas fa-user-md"></i> Medical Certification of Death
              </button>
              <button
                className="form-button"
                onClick={() => navigate('/form-filling/deceased')}
              >
                <i className="fas fa-file-alt"></i> Deceased Information
              </button>
              <button
                className="form-button"
                onClick={() => navigate('/form-filling/funeral-undertaker')}
              >
                <i className="fas fa-clipboard-list"></i> Funeral Arrangements and Burial Details
              </button>
              <button
                className="form-button"
                onClick={() => navigate('/form-filling/informant')}
              >
                <i className="fas fa-id-card"></i> Informant’s Certification of Identity
              </button>
            </div>
            </section>


          {/* Helpful Tips */}
          <HelpfulTips />
        </div>

        {/* Recent Submissions Table */}
        <section >
          <RecentSubmissionsTable />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
