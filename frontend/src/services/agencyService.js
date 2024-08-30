import axios from 'axios';

export const getAgencies = async () => {
  const response = await axios.get('/api/agencies');
  return response.data;
};

export const updateAgencyStatus = async (id, status) => {
  const response = await axios.put(`/api/agencies/${id}/status`, { status });
  return response.data;
};
