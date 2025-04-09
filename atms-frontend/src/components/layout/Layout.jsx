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
    <div className="app-layout min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="content-wrapper flex flex-1 pt-16">
        {shouldShowSidebar && (
          <aside className="sidebar fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-lg z-10">
            <Sidebar />
          </aside>
        )}
        <main className={`main-content flex-1 p-8 ${shouldShowSidebar ? 'ml-64' : ''}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="bg-white rounded-xl shadow-sm p-6 min-h-[calc(100vh-16rem)]">
              {children}
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 