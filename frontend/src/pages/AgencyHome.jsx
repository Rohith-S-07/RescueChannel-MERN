import React from 'react';
import { Outlet } from 'react-router-dom';
import AgencyLayout from '../components/AgencyLayout';

const AgencyHome = () => {
  return (
    <AgencyLayout>
      {/* Outlet will render nested routes */}
      <Outlet />
    </AgencyLayout>
  );
};

export default AgencyHome;
