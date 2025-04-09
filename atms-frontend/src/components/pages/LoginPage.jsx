import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Card from '../common/Card';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, error, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // Debug: Log auth context state
  useEffect(() => {
    console.log('Auth context state:', { user, error });
  }, [user, error]);

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      console.log('User is authenticated, redirecting based on role:', user.role);
      if (user.role === 'admin') {
        // Only admin users go to admin dashboard
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'class_rep') {
        // Class reps go to their own dashboard
        navigate('/class-rep/dashboard', { replace: true });
      } else {
        // Students go to student dashboard
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      console.log('Attempting login with:', formData);
      await login(formData);
      // Navigation will be handled by the useEffect hook when user state changes
    } catch (err) {
      console.error('Login error:', err);
      setFormErrors(prev => ({
        ...prev,
        submit: err.message || 'Login failed'
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary-dark">
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <Input
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-primary hover:text-primary-dark">
                Forgot your password?
              </Link>
            </div>
          </div>

          {(error || formErrors.submit) && (
            <div className="text-red-600 text-sm">
              {error || formErrors.submit}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
          >
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage; 