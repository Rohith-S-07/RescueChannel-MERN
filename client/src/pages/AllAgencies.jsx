import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import config from '../config';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const AllAgencies = () => {
  const [agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/api/agencies`, { credentials: 'include' });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Fetch locations using reverse geocoding
        const agenciesWithLocations = await Promise.all(
          data.map(async (agency) => {
            if (agency.location && agency.location.latitude && agency.location.longitude) {
              const location = await reverseGeocode([agency.location.latitude, agency.location.longitude]);
              return { ...agency, location };
            }
            return { ...agency, location: 'Location not available' };
          })
        );

        setAgencies(agenciesWithLocations);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };

    fetchAgencies();
  }, []);

  const reverseGeocode = async ([lat, lng]) => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
      if (response.data.status === 'OK') {
        const results = response.data.results;
        return results[0]?.formatted_address || 'Location not available';
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      return 'Location not available';
    }
  };

  const filteredAgencies = agencies.filter((agency) =>
    agency.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agency-content hero d-flex flex-column p-3">
      <h1 className="display-5 font-weight-bold mb-2 text-center">All Agencies</h1>
      <p className="mb-4">
        Here, you can view the details of all agencies registered on the Rescue Channel website.
      </p>

      {/* Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          className="form-control w-100"
          placeholder="Search for an Agency by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Agencies List */}
      <div className="row px-3 gy-4">
        {filteredAgencies.map((agency) => (
          <div className="col-12" key={agency._id}>
            <div className="bg-light rounded shadow-sm p-4 border">
              <div className="d-flex flex-column flex-md-row justify-content-between">
                <div className="flex-grow-1">
                  <h3 className="text-primary fs-5">{agency.name}</h3>
                  <p className="text-dark me-2">
                    <span className="text-break">{agency.description}</span>
                  </p>
                  <p className="text-dark">
                    <i className="text-success bi bi-geo-alt me-2"></i>
                    <span className="text-break">{agency.location}</span>
                  </p>
                </div>
                <div className="d-flex flex-column justify-content-between align-items-end text-dark">
                  <p className="d-flex align-items-center fs-6">
                    <i className="bi bi-envelope me-2 text-warning"></i>
                    {agency.email}
                  </p>
                  <p className="text-dark fs-6">
                    <strong>Region:</strong> {agency.region}
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
