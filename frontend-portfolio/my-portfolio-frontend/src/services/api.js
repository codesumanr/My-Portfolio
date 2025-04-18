import axios from 'axios';

// Use environment variable or fallback
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log(`Connecting to API at: ${API_URL}`); // Log only once

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000, // Optional
});

/**
 * Fetches the list of skills from the backend API.
 * Assumes the backend endpoint '/skills/list' returns an object like:
 * { success: Boolean, count: Number, skills: Array<Object> }
 */
export const fetchSkills = async () => {
  try {
    console.log("fetchSkills: Attempting GET /skills/list");
    // Ensure the path '/skills/list' exactly matches your backend route
    const response = await api.get('/skills/list');

    console.log("fetchSkills: Request successful. Status:", response.status);
    // Log the raw data received from the backend *before* returning
    console.log("fetchSkills: Raw response.data:", JSON.stringify(response.data, null, 2));

    // Return the entire data object received from the backend
    // The component (Skills.jsx) expects the object with the 'skills' array inside
    return response.data;

  } catch (error) {
    console.error("--- fetchSkills API Error ---");
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      console.error("Status:", error.response.status);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error("No response received:", error.request);
    } else {
      // Error setting up the request
      console.error("Request setup error:", error.message);
    }
    console.error("Error Config:", error.config);
    // Re-throw error for the component to catch
    throw new Error(`Failed to fetch skills: ${error.response?.data?.message || error.message}`);
  }
};

// --- Other API functions (fetchProjects, fetchExperiences, etc.) ---
// Keep them as they were if they are working correctly
export const fetchProjects = async () => {
  try {
    const response = await api.get('/projects/list');
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('API Error fetching projects:', error.response?.data || error.message || error);
    throw new Error(`Failed to fetch projects: ${error.response?.data?.message || error.message}`);
  }
};

export const fetchExperiences = async () => {
  try {
    const response = await api.get('/experience/list');
    return response.data?.data || response.data || [];
  } catch (error) {
    console.error('API Error fetching experiences:', error.response?.data || error.message || error);
    throw new Error(`Failed to fetch experiences: ${error.response?.data?.message || error.message}`);
  }
};

export const fetchPortfolioInfo = async () => {
  try {
    const response = await api.get('/portfolio-info/list'); // Or just /portfolio-info
    return response.data?.data || response.data || {};
  } catch (error) {
    console.error('API Error fetching portfolio info:', error.response?.data || error.message || error);
    throw new Error(`Failed to fetch portfolio info: ${error.response?.data?.message || error.message}`);
  }
};

// You might not need the default export if only named exports are used
// export default api;