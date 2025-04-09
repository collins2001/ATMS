import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        const response = await authService.getCurrentUser();
        console.log('Get current user response:', response);
        
        // Handle different response structures
        if (response && response.user) {
          // Direct user object in response
          setUser(response.user);
          console.log('Setting user in AuthContext:', response.user);
        } else if (response && response.data && response.data.user) {
          // Nested user object in response.data
          setUser(response.data.user);
          console.log('Setting user in AuthContext (nested):', response.data.user);
        } else {
          console.error('Unexpected getCurrentUser response structure:', response);
          localStorage.removeItem('token');
          setError('Invalid user data format');
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        localStorage.removeItem('token');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login(credentials);
      console.log('Login response in AuthContext:', response);
      
      // Handle different response structures
      if (response && response.user) {
        // Direct user object in response
        setUser(response.user);
        console.log('Setting user in AuthContext:', response.user);
      } else if (response && response.data && response.data.user) {
        // Nested user object in response.data
        setUser(response.data.user);
        console.log('Setting user in AuthContext (nested):', response.data.user);
      } else {
        console.error('Unexpected login response structure:', response);
        throw new Error('Invalid login response format');
      }
      
      return response;
    } catch (err) {
      console.error('Login error in AuthContext:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      localStorage.removeItem('token');
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register(userData);
      console.log('Register response in AuthContext:', response);
      
      // Handle different response structures
      if (response && response.user) {
        // Direct user object in response
        setUser(response.user);
        console.log('Setting user in AuthContext:', response.user);
      } else if (response && response.data && response.data.user) {
        // Nested user object in response.data
        setUser(response.data.user);
        console.log('Setting user in AuthContext (nested):', response.data.user);
      } else {
        console.error('Unexpected register response structure:', response);
        throw new Error('Invalid register response format');
      }
      
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 