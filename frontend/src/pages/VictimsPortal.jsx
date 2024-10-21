import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// console.log('API_KEY:', API_KEY);

const VictimsPortal = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sos');
        const reportsWithLocation = await Promise.all(response.data.map(async (report) => {
          if (report.location && report.location.latitude && report.location.longitude) {
            const address = await reverseGeocode([report.location.latitude, report.location.longitude]);
            return { ...report, location: address };
          }
          return { ...report, location: 'Nearby location not found'};
        }));
        setReports(reportsWithLocation);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
  
    fetchReports();
  }, []);

  const reverseGeocode = async ([lat, lng]) => {
    try {
      const latitude = Number(lat);
      const longitude = Number(lng);
  
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`);
  
      if (response.data.status === "OK") {
        const results = response.data.results;
        const locationDetails = results[0]?.address_components;
  
        if (!locationDetails) {
          console.error('Geocoding failed to retrieve any components');
          return 'Location details not found';
        }
  
        // Extracting useful address components
        const streetNumber = locationDetails.find(component => component.types.includes("street_number"))?.long_name || '';
        const streetName = locationDetails.find(component => component.types.includes("route"))?.long_name || '';
        const locality = locationDetails.find(component => component.types.includes("locality"))?.long_name || '';
        const administrativeArea = locationDetails.find(component => component.types.includes("administrative_area_level_1"))?.long_name || '';
        const country = locationDetails.find(component => component.types.includes("country"))?.long_name || '';
  
        // Construct a relevant address string
        let locationString = '';
  
        if (streetName) {
          locationString += `${streetNumber} ${streetName}, `;
        }
        if (locality) {
          locationString += `${locality}, `;
        }
        if (administrativeArea) {
          locationString += `${administrativeArea}, `;
        }
        if (country) {
          locationString += country;
        }
  
        // Trim any trailing commas and spaces
        locationString = locationString.trim().replace(/,\s*$/, '');
  
        return locationString || 'Nearby location not found';
      } else {
        console.error('Geocoding error:', response.data.status);
        return 'Unknown location';
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
      return 'Unknown location';
    }
  };
  
  

  const filteredReports = reports.filter(report =>
    report.respondentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return b.affectedPeople - a.affectedPeople;
    }
  });

  return (
    <div className='agency-content hero d-flex flex-column p-3'>
      <h1 className="display-5 font-weight-bold mb-2 text-center">Victims Portal</h1>
      <p className="mb-4">
        Here you can view all the reports of disasters or calamities that the victims have submitted. These reports are <span className="text-danger">not verified</span> by any authority and are only for reference purposes.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-bars"></i> Sort By
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><h6 className="dropdown-header">Sort Options</h6></li>
            <li><button className="dropdown-item" onClick={() => setSortOption('date')}>Date</button></li>
            <li><button className="dropdown-item" onClick={() => setSortOption('count')}>Count</button></li>
          </ul>
        </div>

        <input
          type="text"
          className="form-control w-100 ms-3"
          placeholder="Search by Respondent's Name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {sortedReports.map((report) => (
          <div className="col-md-6 col-lg-4 mb-4" key={report._id}>
            <div className="card shadow-sm border-warning">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-dark">{report.emergencyType}</h5>
                  <p className="card-text text-danger">{report.affectedPeople} people affected</p>
                </div>
                <p className="card-text">
                  <i className="bi bi-person me-2 text-success"></i> {report.respondentName}
                </p>
                <p className="card-text">
                  <i className="bi bi-telephone me-2 text-success"></i> {report.phoneNumber}
                </p>
                <p className="card-text">
                  <i className="bi bi-geo-alt me-2 text-success"></i> {report.location}
                </p>
                <p className="card-text">
                  <i className="bi bi-calendar-date me-2 text-success"></i>
                  {report.createdAt ? new Date(report.createdAt).toLocaleString() : 'No date available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VictimsPortal;
