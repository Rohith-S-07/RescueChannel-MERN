import React, { useState, useEffect } from 'react';
import { getAgencies, updateAgencyStatus } from '../services/agencyService';

const AdminPanel = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      const data = await getAgencies();
      setAgencies(data);
    };
    fetchAgencies();
  }, []);

  const handleStatusChange = async (id, status) => {
    await updateAgencyStatus(id, status);
    setAgencies(agencies.map(agency => agency._id === id ? { ...agency, status } : agency));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {agencies.map(agency => (
          <li key={agency._id}>
            {agency.name} - {agency.email}
            <button
              onClick={() => handleStatusChange(agency._id, agency.status === 'onprocess' ? 'approved' : 'onprocess')}
            >
              {agency.status === 'onprocess' ? 'Approve' : 'Revoke Approval'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
