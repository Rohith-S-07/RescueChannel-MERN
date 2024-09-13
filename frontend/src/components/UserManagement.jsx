import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/users', { withCredentials: true })
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleApprove = (id) => {
    axios.put(`http://localhost:5000/api/admin/users/${id}/approve`, {}, { withCredentials: true })
      .then(response => {
        setUsers(users.map(user => (user._id === id ? { ...user, status: 'approved' } : user)));
      })
      .catch(error => console.error('Error approving user:', error));
  };

  return (
    <div>
      <h1>Manage Users</h1>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.status}
            <button onClick={() => handleApprove(user._id)}>Approve</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
