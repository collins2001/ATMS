import React, { useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const NavBar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock notifications data - replace with actual data from your backend
  const notifications = [
    { id: 1, message: 'New assignment submitted', time: '5 minutes ago' },
    { id: 2, message: 'User registration request', time: '1 hour ago' },
    { id: 3, message: 'System update completed', time: '2 hours ago' },
  ];

  return (
    <div className="fixed top-0 right-0 h-16 bg-white shadow-md w-full z-10">
      <div className="flex items-center justify-end h-full px-6">
        {/* Notifications */}
        <div className="relative mr-6">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-full hover:bg-gray-100 relative"
          >
            <FaBell className="text-gray-600 text-xl" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                >
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
          >
            <FaUserCircle className="text-gray-600 text-2xl" />
            <span className="text-gray-700">Admin</span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
              <button
                onClick={() => {
                  // Add profile settings navigation
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                Profile Settings
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
