import React, { useState } from 'react';
import UserManagement from './UserManagement';
import { FaUsers, FaBook, FaCalendar, FaBell } from 'react-icons/fa';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');

  const menuItems = [
    { id: 'users', label: 'Users', icon: <FaUsers /> },
    { id: 'courses', label: 'Courses', icon: <FaBook /> },
    { id: 'schedule', label: 'Schedule', icon: <FaCalendar /> },
    { id: 'notifications', label: 'Notifications', icon: <FaBell /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement />;
      default:
        return <div className="p-4">Feature coming soon...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-6 py-4 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 ${
                activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : ''
              }`}
            >
              <span className="text-xl mr-4">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {menuItems.find(item => item.id === activeTab)?.label}
            </h1>
          </div>
        </header>
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard; 