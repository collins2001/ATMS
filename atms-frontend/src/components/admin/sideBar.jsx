import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaUserCog, 
  FaBook, 
  FaCalendarAlt, 
  FaBullhorn,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { useState } from 'react';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/users', name: 'User Management', icon: <FaUserCog /> },
    { path: '/admin/assignments', name: 'Assignments', icon: <FaBook /> },
    { path: '/admin/timetable', name: 'Timetable', icon: <FaCalendarAlt /> },
    { path: '/admin/announcements', name: 'Announcements', icon: <FaBullhorn /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h2 className="text-xl font-bold">Admin Panel</h2>}
        <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-700">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 transition-colors duration-200 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-300 hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            {isOpen && <span className="ml-4">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <button
          onClick={() => {
            // Add logout logic here
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
