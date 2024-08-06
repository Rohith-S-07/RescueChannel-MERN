import axios from 'axios';

const API_URL = 'http://localhost:5000/api/agencies';

export const getAgencies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAgency = async (agencyData) => {
  const response = await axios.post(API_URL, agencyData);
  return response.data;
};
