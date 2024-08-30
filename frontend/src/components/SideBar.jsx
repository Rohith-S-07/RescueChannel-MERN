import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/styles/AgencyHomepage.css';

const SideBar = ({ setActiveComponent, handleLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const navigate = useNavigate;

  handleLogout = () => {
    localStorage.removeItem('userId');
    
    window.location.reload();
    window.alert("Logged Out Successfully")
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
              className="nav-link"
              onClick={() => setActiveComponent('Dashboard')}
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link"
              onClick={() => setActiveComponent('All Agencies')}
            >
              All Agencies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link"
              onClick={() => setActiveComponent('Rooms')}
            >
              Rooms
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link"
              onClick={() => setActiveComponent('Victims Portal')}
            >
              Victims Portal
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="#"
              className="nav-link"
              onClick={() => setActiveComponent('Maps Portal')}
            >
              Maps Portal
            </NavLink>
          </li>
        </ul>
        <button onClick={handleLogout} className={`btn btn-danger mt-auto ${isCollapsed ? 'd-none' : ''}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
