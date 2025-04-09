import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FaHome, FaBook, FaCalendar, FaBell, FaUsers, FaCog, FaBullhorn, FaFileAlt, FaUser } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: user?.role === 'admin' ? '/admin/dashboard' : 
            user?.role === 'class_rep' ? '/class-rep/dashboard' : 
            '/dashboard',
      icon: <FaHome />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'Assignments',
      path: '/assignments',
      icon: <FaBook />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'Timetable',
      path: '/timetable',
      icon: <FaCalendar />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'Announcements',
      path: '/admin/announcements',
      icon: <FaBullhorn />,
      roles: ['class_rep', 'admin'],
    },
    {
      label: 'View Announcements',
      path: '/student/announcements',
      icon: <FaBullhorn />,
      roles: ['student'],
    },
    {
      label: 'Notes',
      path: '/admin/notes',
      icon: <FaFileAlt />,
      roles: ['class_rep', 'admin'],
    },
    {
      label: 'View Notes',
      path: '/student/notes',
      icon: <FaFileAlt />,
      roles: ['student'],
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: <FaBell />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'User Management',
      path: '/admin/users',
      icon: <FaUsers />,
      roles: ['admin'],
    },
    {
      label: 'Settings',
      path: '/settings',
      icon: <FaCog />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: <FaUser />,
      roles: ['student', 'class_rep', 'admin'],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles && item.roles.includes(user?.role)
  );

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent tracking-tight">ATMS</h2>
        <p className="text-sm text-gray-500 mt-1">
          {user?.role === 'student' ? 'Student Portal' : 
           user?.role === 'class_rep' ? 'Class Rep Portal' : 
           'Admin Portal'}
        </p>
      </div>
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1.5">
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className={`text-lg mr-3 ${
                  isActive(item.path) ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {item.icon}
                </span>
                {item.label}
                {isActive(item.path) && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center px-4 py-3 bg-gray-50 rounded-lg">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-medium text-lg">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 