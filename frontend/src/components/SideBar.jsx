import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/styles/AgencyHomepage.css';

const SideBar = ({ setActiveComponent, activeComponent, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    window.location.reload();
    window.alert("Logged Out Successfully");
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="btn-toggle" onClick={toggleSidebar}>
        {isCollapsed ? (
          <i className="bi bi-chevron-double-right"></i>
        ) : (
          <i className="bi bi-chevron-bar-left"></i>
        )}
      </button>
      <div className="d-flex flex-column align-items-center p-3">
        <h4 className={`${isCollapsed ? 'd-none' : ''} custom-heading`}>Agency Name</h4>
        <ul className={`nav flex-column ${isCollapsed ? 'd-none' : ''}`}>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleClick('Dashboard')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleClick('All Agencies')}
            >
              All Agencies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleClick('Chatrooms')}
            >
              Chatrooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleClick('Victims Portal')}
            >
              Victims Portal
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => handleClick('Maps Portal')}
            >
              Maps Portal
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogoutClick} className={`btn btn-danger mt-auto ${isCollapsed ? 'd-none' : ''}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
