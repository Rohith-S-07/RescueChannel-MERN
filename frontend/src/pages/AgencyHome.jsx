import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AgencyLayout from '../components/AgencyLayout';

const AgencyHome = () => {

  // Check the user's role from localStorage
  const userRole = localStorage.getItem('userRole');

  // If the user is not an 'user', redirect to the sign-in page
  if (userRole !== 'user') {
    return <Navigate to="/signin" replace />;
  }

  return (
    <AgencyLayout>
      {/* Outlet will render nested routes */}
      <Outlet />
    </AgencyLayout>
  );
};

export default AgencyHome;
