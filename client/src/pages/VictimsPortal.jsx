import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import EditStatusModal from '../components/EditStatusModal'; // Import the EditStatusModal component
import config from '../config';

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const VictimsPortal = () => {
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('date');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' }); // Notification state
  

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/sos`);
        const reportsWithLocation = await Promise.all(response.data.map(async (report) => {
          if (report.location && report.location.latitude && report.location.longitude) {
            const address = await reverseGeocode([report.location.latitude, report.location.longitude]);
            return { ...report, location: address };
          }
          return { ...report, location: 'Nearby location not found' };
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
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`);
      if (response.data.status === "OK") {
        return response.data.results[0]?.formatted_address || 'Location details not found';
      } else {
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
    return sortOption === 'date' ? new Date(b.createdAt) - new Date(a.createdAt) : b.affectedPeople - a.affectedPeople;
  });

  const handleEditStatus = (report) => {
    setSelectedReport(report);
    setShowEditModal(true);
  };

  const handleUpdateReport = async (updatedReport) => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/sos`);
      const reportsWithLocation = await Promise.all(response.data.map(async (report) => {
        if (report.location && report.location.latitude && report.location.longitude) {
          const address = await reverseGeocode([report.location.latitude, report.location.longitude]);
          return { ...report, location: address };
        }
        return { ...report, location: 'Nearby location not found' };
      }));
      setReports(reportsWithLocation);

      // Show success notification
      setNotification({ message: 'Status updated successfully!', type: 'success' });

      setTimeout(() => {
        setNotification({ message: '', type: '' });
      }, 3000);

    } catch (error) {
      console.error('Error updating report:', error);
    }
  };

  return (
    <div className='agency-content hero d-flex flex-column p-3'>
      <h1 className="display-5 font-weight-bold mb-2 text-center">Victims Portal</h1>
      <p className="mb-4">
        Here you can view all the reports of disasters or calamities that the victims have submitted. These reports are <span className="text-danger">not verified</span> by any authority and are only for reference purposes.
      </p>

      {notification.message && (
        <div className={`alert alert-${notification.type} mt-3`} role="alert">
          {notification.message}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="dropdown">
          <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
            Sort By
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
          <div className="col-md-6 col-lg-6 mb-4" key={report._id}>
            <div className="card shadow-sm border-warning">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <h5 className="card-title text-dark">{report.emergencyType}</h5>
                  <p className="card-text text-danger">{report.affectedPeople} people affected</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="card-text"><i className="bi bi-person me-2 text-success"></i> {report.respondentName}</p>
                  <p className="card-text"><i className="bi bi-telephone me-2 text-success"></i> {report.phoneNumber}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="card-text">
                    <i className="bi bi-calendar-date me-2 text-success"></i>
                    {report.createdAt ? new Date(report.createdAt).toLocaleString() : 'No date available'}
                  </p>
                  <span className={`badge mb-3 ${report.status === 'completed' ? 'bg-success' : report.status === 'in-progress' ? 'bg-warning' : 'bg-danger'}`}>
                    {report.status}
                  </span>
                </div>
                <p className="card-text"><i className="bi bi-geo-alt me-2 text-success"></i> {report.location}</p>
                <p className="card-text"><i className="bi bi-building me-2 text-success"></i><b className='me-2'> Action Taken by : </b> {report.completedByAgency || 'Awaiting Response'}</p>

                <button
                  className="btn btn-primary"
                  onClick={() => handleEditStatus(report)}
                  disabled={report.status === 'completed'}
                >
                  Edit Status
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showEditModal && (
        <EditStatusModal
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          report={selectedReport}
          handleUpdate={handleUpdateReport}
        />
      )}
    </div>
  );
};

export default VictimsPortal;
