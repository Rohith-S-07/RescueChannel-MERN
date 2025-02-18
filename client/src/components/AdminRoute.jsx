// AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Admin route guard to check if the user is an admin
const AdminRoute = () => {
  const userRole = localStorage.getItem('userRole');

  // Check if the user role is 'admin', otherwise redirect to login
  if (userRole !== 'admin') {
    return <Navigate to="/signin" replace />;
  }

  // Render the outlet to display the admin content if the user is an admin
  return <Outlet />;
};

export default AdminRoute;
