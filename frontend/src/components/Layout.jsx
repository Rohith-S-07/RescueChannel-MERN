import React from 'react';
import TopBar from './TopBar';
import BottomBar from './BottomBar';


const Layout = ({ children }) => {
  return (
    <div>
      <TopBar />
      <div className="content content-container">
        {children}
      </div>
      <BottomBar />
    </div>
  );
};

export default Layout;
