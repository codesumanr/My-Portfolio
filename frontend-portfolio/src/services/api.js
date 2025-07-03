import axios from 'axios';

//  Use environment variable or fallback to localhost for local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create Axios instance with baseURL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch Skills
 * Assumes endpoint: /api/skills/list
 */
export const fetchSkills = async () => {
  try {
    console.log("fetchSkills: Attempting GET /skills/list");
    const response = await api.get('/api/skills/list');
    console.log("fetchSkills: Response:", response.data);
    return response.data;
  } catch (error) {
    handleApiError('fetchSkills', error);
    throw new Error(`Failed to fetch skills: ${error.response?.data?.message || error.message}`);
  }
};

/**
 * Fetch Projects
 * Assumes endpoint: /api/projects/list
 */
export const fetchProjects = async () => {
  try {
    const response = await api.get('/api/projects/list');
    return response.data?.data || response.data || [];
  } catch (error) {
    handleApiError('fetchProjects', error);
    throw new Error(`Failed to fetch projects: ${error.response?.data?.message || error.message}`);
  }
};

/**
 *  Fetch Experiences
 * Assumes endpoint: /api/experience/list
 */
export const fetchExperiences = async () => {
  try {
    const response = await api.get('/api/experience/list');
    return response.data?.data || response.data || [];
  } catch (error) {
    handleApiError('fetchExperiences', error);
    throw new Error(`Failed to fetch experiences: ${error.response?.data?.message || error.message}`);
  }
};

/**
 *  Fetch Portfolio Info
 * Assumes endpoint: /api/portfolio-info/list
 */
export const fetchPortfolioInfo = async () => {
  try {
    const response = await api.get('/api/portfolio-info/list');
    return response.data?.data || response.data || {};
  } catch (error) {
    handleApiError('fetchPortfolioInfo', error);
    throw new Error(`Failed to fetch portfolio info: ${error.response?.data?.message || error.message}`);
  }
};

/**

 */
const handleApiError = (functionName, error) => {
  console.error(`--- ${functionName} API Error ---`);
  if (error.response) {
    console.error("Status:", error.response.status);
    console.error("Data:", error.response.data);
    console.error("Headers:", error.response.headers);
  } else if (error.request) {
    console.error("No response received:", error.request);
  } else {
    console.error("Request setup error:", error.message);
  }
};
