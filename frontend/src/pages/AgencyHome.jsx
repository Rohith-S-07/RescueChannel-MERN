import React, { useEffect, useState } from 'react';
import { getAgencies } from '../services/agencyService';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/AgencyHomepage.css';

const AgencyHome = () => {
  const [agencies, setAgencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAgencies();
      setAgencies(data);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    // navigate('/signin');
    alert("Succefully Logged out")
    window.location.reload();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar bg-light">
          <div className="d-flex flex-column align-items-center p-3">
            <h2>Agency Dashboard</h2>
            <button onClick={handleLogout} className="btn btn-danger mt-auto">
              Logout
            </button>
          </div>
        </div>
        <div className="col-md-9 main-content">
          <h1>Agency Home</h1>
          <ul>
            {agencies.map((agency) => (
              <li key={agency._id}>{agency.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AgencyHome;
