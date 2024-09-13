import React, { useState } from 'react';
import '../assets/styles/AgencyHomepage.css';
import SideBar from '../components/SideBar';
import Dashboard from '../components/Dashboard';
import AllAgencies from '../components/AllAgencies';
import Chatrooms from '../components/Chatrooms';
import VictimsPortal from '../components/VictimsPortal';
// import MapsPortal from '../components/MapsPortal';

const AgencyHome = () => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'All Agencies':
        return <AllAgencies />;
      case 'Chatrooms':
        return <Chatrooms/>;
      case 'Victims Portal':
        return <VictimsPortal />;
      // case 'Maps Portal':
      //   return <MapsPortal />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="d-flex">
      <SideBar setActiveComponent={setActiveComponent} />
      <div className="agency-content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default AgencyHome;
