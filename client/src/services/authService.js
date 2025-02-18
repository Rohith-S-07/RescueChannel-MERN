import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Log out the current user
export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    // Log detailed error information for debugging
    console.error('Logout error:', error);
    throw new Error(error.response?.data.message || 'Logout failed');
  }
};
