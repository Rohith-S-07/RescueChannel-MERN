import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import RescueLogo from '../assets/images/rescue-logo.png';
import UserManagement from '../components/UserManagement';


const AdminHome = () => {
  const [activeComponent, setActiveComponent] = useState('userManagement');

  const handleNavLinkClick = (component) => {
    setActiveComponent(component);
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarToggler && navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'userManagement':
        return <UserManagement />;
    //   case 'placeholder':
    //     return <PlaceholderComponent />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div>
      {/* Topbar */}
      <nav className="navbar navbar-expand-lg custom-navbar fixed-top mx-1">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/admin">
            <img src={RescueLogo} alt="RC" height={50} />
            <span className="custom-heading fs-4">Admin Panel</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={() => handleNavLinkClick('userManagement')}
                >
                  Agencies
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link mt-1"
                  onClick={() => handleNavLinkClick('userManagement')}
                >
                  Reports 
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Admin Dashboard */}
      <div className="content-container">
        {renderActiveComponent()}
      </div>
    </div>
  );
};

export default AdminHome;
