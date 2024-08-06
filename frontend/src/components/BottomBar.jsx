import React from 'react';
import { NavLink } from 'react-router-dom';

import RescueLogo from '../assets/images/rescue-logo.png'

const BottomBar = () => {
  return (
    <footer className="content-container pb-3 mx-2">
      <div className="row text-center text-md-start d-flex">
        <div className='col mb-3'>
          <NavLink className="navbar-brand" to="/">
            <img src={RescueLogo} alt="RC" height={50}/>
            <span className="custom-heading">Rescue Channel</span>
          </NavLink>
        </div>
        <div className="col mb-3">
          <ul className="list-unstyled text-muted">
            <li>
              <NavLink className="text-decoration-none text-muted" to="/about-us">
                About Us
              </NavLink>
            </li>
            
            <li>
              <NavLink className="text-decoration-none text-muted" to="/contact">
                Need Help?
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <ul className="list-unstyled text-muted">
            <li>
              <i className="fab fa-facebook me-2"></i>
              <a href="#" className="text-decoration-none text-muted">
                Facebook
              </a>
            </li>
            <li>
              <i className="fab fa-twitter me-2"></i>
              <a href="#" className="text-decoration-none text-muted">
                Twitter
              </a>
            </li>
            <li>
              <i className="fab fa-instagram me-2"></i>
              <a href="#" className="text-decoration-none text-muted">
                Instagram
              </a>
            </li>
            <li>
              <i className="fab fa-linkedin me-2"></i>
              <a href="#" className="text-decoration-none text-muted">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        <div className="col mb-3">
          <ul className="list-unstyled text-muted">
            <li>
              <a href="#" className="text-decoration-none text-muted">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-decoration-none text-muted">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-muted">&copy; 2024 Resque Channel. All rights reserved.</p>
    </footer>
  );
};

export default BottomBar;
