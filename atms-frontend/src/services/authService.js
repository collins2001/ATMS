import api from './api';

const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Login failed');
    }
  },

  register: async (userData) => {
    try {
      console.log('Registering with data:', userData);
      const response = await api.post('/auth/register', userData);
      if (response.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Registration failed');
    }
  },

  logout: async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('token');
    }
  },

  getCurrentUser: async () => {
    try {
      return await api.get('/auth/me');
    } catch (error) {
      console.error('Get current user error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Failed to get current user');
    }
  },

  updateProfile: async (userData) => {
    try {
      return await api.put('/auth/profile', userData);
    } catch (error) {
      console.error('Update profile error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Failed to update profile');
    }
  },

  forgotPassword: async (email) => {
    try {
      return await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Forgot password error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Failed to process forgot password request');
    }
  },

  resetPassword: async (token, newPassword) => {
    try {
      return await api.post('/auth/reset-password', { token, newPassword });
    } catch (error) {
      console.error('Reset password error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Failed to reset password');
    }
  },

  verifyEmail: async (token) => {
    try {
      return await api.post('/auth/verify-email', { token });
    } catch (error) {
      console.error('Verify email error:', error);
      if (error.validationErrors) {
        throw new Error(error.validationErrors.join(', '));
      }
      throw new Error(error.message || 'Failed to verify email');
    }
  }
};

export default authService; 