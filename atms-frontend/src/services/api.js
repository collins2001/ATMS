import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
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

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      // Log the full error response for debugging
      console.error('API Error Response:', error.response.data);

      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Only remove token and redirect if not trying to login, register, or access public endpoints
          if (!error.config.url.includes('/auth/login') && 
              !error.config.url.includes('/auth/register') &&
              !error.config.url.includes('/test')) {
            localStorage.removeItem('token');
            if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
              window.location.href = '/login';
            }
          }
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error('An error occurred');
      }

      // Handle validation errors array
      if (error.response.data.errors && Array.isArray(error.response.data.errors)) {
        return Promise.reject({
          message: error.response.data.errors.join(', '),
          status: error.response.status,
          data: error.response.data,
          validationErrors: error.response.data.errors
        });
      }

      // Return a rejected promise with the error message
      return Promise.reject({
        message: error.response.data.error || 'An unexpected error occurred',
        status: error.response.status,
        data: error.response.data
      });
    }
    return Promise.reject({
      message: error.message || 'Network error occurred',
      status: 0
    });
  }
);

export default api; 