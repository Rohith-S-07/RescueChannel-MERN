import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../assets/styles/AgencyHomepage.css';

const SideBar = ({ setActiveComponent, activeComponent }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userId');
    navigate('/');
    window.alert('Logged Out Successfully');
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
      <div className="d-flex flex-column align-items-center">
        <h4 className={`custom-heading ${isCollapsed ? 'd-none' : ''}`}>
          Agency Name
        </h4>

        <ul className={`nav flex-column w-100 ${isCollapsed ? 'collapsed-nav' : ''}`}>
          <li className="nav-item">
            <NavLink
              to="/agency/agency-dashboard"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveComponent('AgencyDashboard')}
            >
              <i className="bi bi-speedometer2 custom-text"></i>
              {!isCollapsed && <span className='m-2'>Agency Dashboard</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/agency/all-agencies"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveComponent('All Agencies')}
            >
              <i className="bi bi-building custom-text"></i>
              {!isCollapsed && <span className='m-2'>All Agencies</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/agency/chatrooms"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveComponent('Chatrooms')}
            >
              <i className="bi bi-chat-dots custom-text"></i>
              {!isCollapsed && <span className='m-2'>Chatrooms</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/agency/victims-portal"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveComponent('Victims Portal')}
            >
              <i className="bi bi-person-hearts custom-text"></i>
              {!isCollapsed && <span className='m-2'>Victims Portal</span>}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/agency/maps-portal"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setActiveComponent('Maps Portal')}
            >
              <i className="bi bi-map custom-text"></i>
              {!isCollapsed && <span className='m-2'>Maps Portal</span>}
            </NavLink>
          </li>
        </ul>

        <button onClick={handleLogoutClick} className={`btn btn-danger mt-auto logout-btn ${isCollapsed ? 'd-none' : ''}`}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
