import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const VictimsPortal = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date'); // Sort by date or count

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sos');
        console.log('Fetched Reports:', response.data);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report =>
    report.respondentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.createdAt) - new Date(a.createdAt); // Sort by date
    } else {
      return b.affectedPeople - a.affectedPeople; // Sort by count
    }
  });

  return (
    <div className='agency-content hero d-flex flex-column p-3'>
      <h1 className="display-5 font-weight-bold mb-2">Victims Portal</h1>
      <p className="mb-4">
        Here you can view all the reports of disasters or calamities that the victims have submitted. These reports are <span className="text-danger">not verified</span> by any authority and are only for reference purposes.
      </p>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="dropdown">
          <button
            className="btn btn-light dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown" // Changed to data-bs for Bootstrap 5
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
            <div className="card shadow-sm border-primary">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-dark">{report.emergencyType}</h5>
                  <p className="card-text text-danger">{report.affectedPeople} people affected</p>
                </div>
                <p className="card-text">
                  <i className="bi bi-person me-2 text-info"></i> {report.respondentName}
                </p>
                <p className="card-text">
                  <i className="bi bi-telephone me-2 text-info"></i> {report.phoneNumber}
                </p>
                <p className="card-text">
                  <i className="bi bi-geo-alt me-2 text-info"></i> {report.location}
                </p>
                <p className="card-text">
                  <i className="bi bi-calendar me-2 text-info"></i>
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
