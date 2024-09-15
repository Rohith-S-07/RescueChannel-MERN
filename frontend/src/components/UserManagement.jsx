import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  // Handle user approval
  const handleApprove = (id) => {
    axios.put(`http://localhost:5000/api/admin/users/${id}/approve`, {}, { withCredentials: true })
      .then(response => {
        setUsers(users.map(user => (user._id === id ? { ...user, status: 'approved' } : user)));
      })
      .catch(error => {
        console.error('Error approving user:', error);
        setError('Error approving user');
      });
  };

  // Handle user deletion
  const handleDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this user?");
    
    if (isConfirmed) {
      axios.delete(`http://localhost:5000/api/admin/users/${id}`, { withCredentials: true })
        .then(response => {
          setUsers(users.filter(user => user._id !== id));
          window.alert("User deleted successfully");
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setError('Error deleting user');
        });
    } else {
      window.alert("User deletion canceled");
    }
  };

  // Show loading spinner or error message
  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Manage Users</h1>
      {users.length === 0 ? (
        <p>No users to manage</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              {user.name} - {user.email} - {user.status}
              {user.status !== 'approved' && (
                <button onClick={() => handleApprove(user._id)}>Approve</button>
              )}
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserManagement;
