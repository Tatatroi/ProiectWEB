// This approach doesn't use process.env directly
const getApiUrl = () => {
  // Check if we're in development
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  
  // Production URL - replace with your actual Render URL
  return 'https://tripplanner-appd.onrender.com';
};

export const API_URL = getApiUrl();

// Export individual endpoints if needed
export const endpoints = {
  signup: `${API_URL}/api/users`,
  login: `${API_URL}/api/users`,
  // Add more endpoints as needed
};