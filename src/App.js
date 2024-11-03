import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import FormTypeSelection from './pages/FormTypeSelection';
import MedicalPractitionerForm from './pages/forms/MedicalPractitionerForm';
import DeceasedForm from './pages/forms/DeceasedForm';
import FuneralUndertakerForm from './pages/forms/FuneralUndertakerForm';
import InformantForm from './pages/forms/InformantForm';
import SubmissionSuccess from './pages/SubmissionSuccess';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form-filling/medical-practitioner" element={<MedicalPractitionerForm />} />
        <Route path="/form-filling/deceased" element={<DeceasedForm />} />
        <Route path="/form-filling/funeral-undertaker" element={<FuneralUndertakerForm />} />
        <Route path="/form-filling/informant" element={<InformantForm />} />
        <Route path="/submission-success" element={<SubmissionSuccess />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;
