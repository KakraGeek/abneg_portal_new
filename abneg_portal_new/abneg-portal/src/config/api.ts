// API configuration for development vs production
const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000'  // Local Express.js server
  : ''; // Production: use relative URLs for Vercel functions

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
}; 