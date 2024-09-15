import React, { useState } from 'react';
import TopBar from '../components/TopBar'; // Assuming you have a TopBar component
import SideBar from '../components/SideBar';

const AgencyLayout = ({ children }) => {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  return (
    <div className="d-flex">
      {/* Sidebar Component */}
      <SideBar 
        setActiveComponent={setActiveComponent}
        activeComponent={activeComponent}
      />
      
      <div className="w-100">
        {/* TopBar Component */}
        <TopBar />
        
        {/* Content Area */}
        <div className="content p-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AgencyLayout;
