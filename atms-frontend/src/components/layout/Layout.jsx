import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';

const Layout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // List of routes that should not show the sidebar
  const noSidebarRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const shouldShowSidebar = isAuthenticated && !noSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-layout min-h-screen bg-gray-50">
      <Header />
      <div className="content-wrapper flex flex-1">
        {shouldShowSidebar && (
          <aside className="sidebar w-64 bg-white shadow-md">
            <Sidebar />
          </aside>
        )}
        <main className={`main-content flex-1 p-6 ${shouldShowSidebar ? 'ml-64' : ''}`}>
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 