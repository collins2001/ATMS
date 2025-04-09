import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FaHome, FaBook, FaCalendar, FaBell, FaUsers, FaCog, FaBullhorn, FaFileAlt } from 'react-icons/fa';

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
  ];

  const filteredMenuItems = menuItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">ATMS</h2>
        <p className="text-sm text-gray-500 mt-1">
          {user?.role === 'student' ? 'Student Portal' : 
           user?.role === 'class_rep' ? 'Class Rep Portal' : 
           'Admin Portal'}
        </p>
      </div>
      <nav className="mt-4">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600' : ''
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 