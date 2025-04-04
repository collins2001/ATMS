import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { FaHome, FaBook, FaCalendar, FaBell, FaUsers, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <FaHome />,
      roles: ['student', 'class_rep', 'admin'],
    },
    {
      label: 'Assignments',
      path: '/assignments',
      icon: <FaBook />,
      roles: ['student', 'class_rep'],
    },
    {
      label: 'Timetable',
      path: '/timetable',
      icon: <FaCalendar />,
      roles: ['student', 'class_rep'],
    },
    {
      label: 'Notifications',
      path: '/notifications',
      icon: <FaBell />,
      roles: ['student'],
    },
    {
      label: 'User Management',
      path: '/admin/users',
      icon: <FaUsers />,
      roles: ['class_rep', 'admin'],
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
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">ATMS</h2>
      </div>
      <nav className="mt-4">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 ${
                  isActive(item.path) ? 'bg-primary-light text-primary-dark font-medium' : ''
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