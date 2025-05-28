// Determine API URL based on environment
const getApiUrl = () => {
  if (window.location.hostname === 'localhost' || 
      window.location.hostname === '127.0.0.1') {
    return 'http://localhost:4000';
  }
  return 'https://tripplanner-appd.onrender.com';
};

export const API_URL = getApiUrl();

// API service with all your endpoints
export const api = {
  // User Authentication
  signup: async (userData) => {
    const response = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Server error");
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Login failed");
    return data;
  },

  // Trip Management
  getUserTrips: async (userId) => {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Failed to fetch trips");
    return data;
  },

  createTrip: async (tripData) => {
    const response = await fetch(`${API_URL}/api/trips`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Failed to create trip");
    return data;
  },

  updateTrip: async (tripId, tripData) => {
    const response = await fetch(`${API_URL}/api/trips/${tripId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tripData),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Failed to update trip");
    return data;
  },

  deleteTrip: async (tripId) => {
    const response = await fetch(`${API_URL}/api/trips/${tripId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.mes || "Failed to delete trip");
    return data;
  },
};

export default api;
