import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Button from '../common/Button';

const LandingPage = () => {
  const [apiStatus, setApiStatus] = useState('');

  useEffect(() => {
    const testBackendConnection = async () => {
      try {
        const response = await api.get('/test');
        setApiStatus('✅ Connected to backend successfully');
        console.log('Backend response:', response);
      } catch (error) {
        setApiStatus('❌ Failed to connect to backend');
        console.error('Backend connection error:', error);
      }
    };

    testBackendConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Academic Task Management System
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Streamline your academic tasks, collaborate with classmates, and stay organized with our comprehensive task management system.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link to="/login">
                  <Button variant="primary" size="lg">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link to="/about">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            {apiStatus && (
              <div className="mt-4 text-sm font-medium">
                {apiStatus}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 