import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for basic error handling
api.interceptors.response.use(
  (response) => {
    // Log the response for debugging
    console.log('API Response:', response);
    
    // Check if response.data exists
    if (response && response.data) {
      return response.data;
    }
    
    // If no data property, return the entire response
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    console.error('API Error:', error.response || error);
    return Promise.reject({
      message: error.response?.data?.message || error.response?.data?.error || 'An unexpected error occurred',
      status: error.response?.status || 500,
      data: error.response?.data
    });
  }
);

export default api; 