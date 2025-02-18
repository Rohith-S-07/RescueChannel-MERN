import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import ResponderHome from './pages/ResponderHome';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import SOSFormPage from './pages/SOSFormPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import AgencyHome from './pages/AgencyHome';
import AgencyDashboard from './pages/AgencyDashboard';
import AllAgencies from './pages/AllAgencies';
import Chatrooms from './pages/Chatrooms';
import VictimsPortal from './pages/VictimsPortal';
import MapsPortal from './pages/MapsPortal'
import AdminRoute from './components/AdminRoute';
import AdminHome from './pages/AdminHome';
import UserManagement from './components/UserManagement';

import './assets/styles/LandingPage.css';
import './assets/styles/AgencyHomepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  const [userId, setUserId] = useState(null);
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      validateUserId(storedUserId);
    }
  }, []);

  const validateUserId = async (id) => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/auth/validatesession/${id}`, { withCredentials: true });
      if (response.status === 200 && response.data.valid) {
        setIsValidUser(true);
      } else {
        localStorage.removeItem('userId');
        setIsValidUser(false);
      }
    } catch (error) {
      console.error('Validation error:', error);
      localStorage.removeItem('userId');
      setIsValidUser(false);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Main layout with conditional rendering of Responder or Agency Home */}
        <Route 
          path="/" 
          element={
            <Layout>
              {isValidUser ? (
                <Navigate to="/agency/agency-dashboard" replace />
              ) : (
                <ResponderHome />
              )}
            </Layout>
          } 
        />
        <Route path="/about-us" element={<Layout><AboutUs /></Layout>} />
        <Route path="/contact" element={<Layout><ContactUs /></Layout>} />
        <Route path="/sos-form" element={<Layout><SOSFormPage /></Layout>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/users" element={<UserManagement />} />
        </Route>

        {/* Nested Agency Pages */}
        <Route path="/agency" element={<AgencyHome />}>
          <Route path="agency-dashboard" element={<AgencyDashboard />} />
          <Route path="all-agencies" element={<AllAgencies />} />
          <Route path="chatrooms" element={<Chatrooms />} />
          <Route path="victims-portal" element={<VictimsPortal />} />
          <Route path="maps-portal" element={<MapsPortal />} />
          {/* Add more agency-related routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;