import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import NotificationModal from './NotificationModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const ContactUsReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch contact reports from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/contactus', { withCredentials: true })
      .then(response => {
        setReports(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        setError('Error fetching reports');
        setLoading(false);
      });
  }, []);

  // Handle report deletion
  const handleDelete = (id) => {
    setPendingAction({ type: 'delete', id });
    setIsConfirmModalOpen(true);
  };

  const confirmDeletion = () => {
    const { id } = pendingAction;

    axios.delete(`http://localhost:5000/api/admin/contactus/${id}`, { withCredentials: true })
      .then(response => {
        setReports(reports.filter(report => report._id !== id));
        setNotificationMessage('Report deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting report:', error);
        setError('Error deleting report');
        setNotificationMessage('Error deleting report');
      })
      .finally(() => {
        setIsConfirmModalOpen(false);
        setIsNotificationModalOpen(true);
        setPendingAction(null);
      });
  };

  // Show loading spinner or error message
  if (loading) return <p>Loading reports...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hero p-3">
      <h2 className="mb-3 custom-heading">Contact Us Reports</h2>
      {reports.length === 0 ? (
        <p>No reports to display</p>
      ) : (
        <div className="table-responsive">
        <table className="table table-striped table-bordered rounded">
          <thead className="thead-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Subject</th>
              <th>Query Type</th>
              <th>Message</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report._id}>
                <td>{report.first_name}</td>
                <td>{report.last_name}</td>
                <td>{report.email}</td>
                <td><b>{report.phone}</b></td>
                <td>{report.subject}</td>
                <td>{report.query_type}</td>
                <td>{report.message}</td>
                <td>{new Date(report.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(report._id)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmDeletion}
        message={`Are you sure you want to delete this report?`}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={() => setIsNotificationModalOpen(false)}
        message={notificationMessage}
      />
    </div>
  );
};

export default ContactUsReports;
