import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConfirmationModal from './ConfirmationModal';
import NotificationModal from './NotificationModal';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch users from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', { withCredentials: true })
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setError('Error fetching users');
        setLoading(false);
      });
  }, []);

  // Handle user approval and toggle status between approved and onprocess
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'approved' ? 'onprocess' : 'approved';
    setPendingAction({ type: 'status', id, newStatus });
    setIsConfirmModalOpen(true);
  };

  const confirmStatusChange = () => {
    const { id, newStatus } = pendingAction;

    axios.put(`http://localhost:5000/api/admin/users/${id}/status`, { status: newStatus }, { withCredentials: true })
      .then(response => {
        setUsers(users.map(user =>
          user._id === id ? { ...user, status: newStatus } : user
        ));
        setNotificationMessage('Agency status updated successfully');
      })
      .catch(error => {
        console.error('Error updating agency status:', error);
        setError('Error updating agency status');
        setNotificationMessage('Error updating agency status');
      })
      .finally(() => {
        setIsConfirmModalOpen(false);
        setIsNotificationModalOpen(true);
        setPendingAction(null);
      });
  };

  // Handle user deletion
  const handleDelete = (id) => {
    setPendingAction({ type: 'delete', id });
    setIsConfirmModalOpen(true);
  };

  const confirmDeletion = () => {
    const { id } = pendingAction;

    axios.delete(`http://localhost:5000/api/admin/users/${id}`, { withCredentials: true })
      .then(response => {
        setUsers(users.filter(user => user._id !== id));
        setNotificationMessage('Agency deleted successfully');
      })
      .catch(error => {
        console.error('Error deleting agency:', error);
        setError('Error deleting agency');
        setNotificationMessage('Error deleting agency');
      })
      .finally(() => {
        setIsConfirmModalOpen(false);
        setIsNotificationModalOpen(true);
        setPendingAction(null);
      });
  };

  // Show loading spinner or error message
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="hero p-3">
      <h2 className="mb-3 custom-heading">Manage Agencies</h2>
      {users.length === 0 ? (
        <p>No agencies to manage</p>
      ) : (
        <table className="table table-striped table-bordered rounded">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Document</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td><b>{user.name}</b></td>
                <td>{user.email}</td>
                <td><i>{user.status === 'approved' ? 'Approved' : 'In Progress'}</i></td>
                <td>
                  {user.licenseDocument && (
                    <a
                      href={`http://localhost:5000/${user.licenseDocument}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='btn btn-success btn-sm'
                    >
                      View Document
                    </a>
                  )}
                </td>
                <td>
                  <button
                    className={`btn ${user.status === 'approved' ? 'btn-warning' : 'btn-success'} btn-sm me-2`}
                    onClick={() => handleToggleStatus(user._id, user.status)}
                  >
                    <i class="bi bi-pencil-square me-2"></i>
                    {user.status === 'approved' ? 'Revoke Approval' : 'Approve'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id)}
                  >
                    <i class="bi bi-trash me-2"></i>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setIsConfirmModalOpen(false)}
        onConfirm={pendingAction?.type === 'delete' ? confirmDeletion : confirmStatusChange}
        message={`Are you sure you want to ${pendingAction?.type === 'delete' ? 'delete this Agency?' : `change the status to ${pendingAction?.newStatus}?`}`}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onRequestClose={() => setIsNotificationModalOpen(false)}
        message={notificationMessage}
      />
    </div>
  );
};

export default UserManagement;
