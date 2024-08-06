import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import ResponderHome from './pages/ResponderHome';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs'; 
import Profile from './pages/Profile';
import SOSFormPage from './pages/SOSFormPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AgencyHome from './pages/AgencyHome';

import './assets/styles/LandingPage.css'
import './assets/styles/AgencyHomepage.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>{user?.role === 'agency' ? <AgencyHome /> : <ResponderHome />}</Layout>} />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
        <Route path="/sos-form" element={<Layout><SOSFormPage /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/signin" element={<Layout><SignIn /></Layout>} />
      </Routes>
    </Router>
  );
};

export default App;
