import React, { useState, useEffect } from 'react';
import { getAgencies, updateAgencyStatus } from '../services/adminService';

const ManageAgencies = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      const data = await getAgencies();
      setAgencies(data);
    };
    fetchAgencies();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'onprocess' ? 'approved' : 'onprocess';
    await updateAgencyStatus(id, newStatus);
    setAgencies(agencies.map(agency => agency._id === id ? { ...agency, status: newStatus } : agency));
  };

  return (
    <div>
      <h2>Manage Agencies</h2>
      <ul>
        {agencies.map(agency => (
          <li key={agency._id}>
            {agency.name} - Status: {agency.status}
            <button onClick={() => handleToggleStatus(agency._id, agency.status)}>
              {agency.status === 'onprocess' ? 'Approve' : 'Revert'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageAgencies;
