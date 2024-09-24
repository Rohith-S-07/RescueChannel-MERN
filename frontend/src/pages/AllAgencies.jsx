import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AllAgencies = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/agencies', { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  return (
    <div className="agency-content hero d-flex flex-column p-3">
      {/* Search Bar */}
      <div className="row p-3">
        <div className="col-md-12 d-flex align-items-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search a particular Agency..."
          />
        </div>
      </div>

      {/* Agencies List */}
      <div className="row px-3 gy-4">
        {agencies.map((agency) => (
          <div className="col-12" key={agency._id}>
            <div className="bg-light rounded shadow-sm p-4 border">
              <div className="d-flex justify-content-between">
                <div>
                  <h3 className="text-primary">{agency.name}</h3>
                  <p className="text-dark">
                  <i className="bi bi-geo-alt me-1"></i>
                    {agency.region}, {agency.district}, {agency.state}
                  </p>
                  <p className="text-secondary">{agency.description}</p>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end text-info">
                  <p className="d-flex align-items-center">
                  <i className="bi bi-envelope me-2"></i>
                    {agency.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAgencies;
