import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaBook, FaCalendar, FaBell } from 'react-icons/fa';

const AdminDashboard = () => {
  const menuItems = [
    { 
      id: 'users', 
      label: 'Users', 
      icon: <FaUsers />,
      path: '/admin/users',
      description: 'Manage system users and their roles'
    },
    { 
      id: 'courses', 
      label: 'Courses', 
      icon: <FaBook />,
      path: '#',
      description: 'Manage course information and materials'
    },
    { 
      id: 'schedule', 
      label: 'Schedule', 
      icon: <FaCalendar />,
      path: '#',
      description: 'View and manage class schedules'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: <FaBell />,
      path: '#',
      description: 'Manage system notifications'
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-xl">{item.icon}</span>
              </div>
              <h2 className="ml-4 text-lg font-semibold">{item.label}</h2>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard; 