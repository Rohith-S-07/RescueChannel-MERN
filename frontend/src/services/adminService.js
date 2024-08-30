import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

export const getUnapprovedAgencies = async () => {
  const response = await axios.get(`${API_URL}/agencies`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};

export const approveAgency = async (agencyId) => {
  const response = await axios.put(`${API_URL}/agencies/${agencyId}/approve`, {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data;
};
