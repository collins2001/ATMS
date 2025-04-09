import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaBook, FaCalendar, FaBullhorn, FaFileAlt, FaPlus, FaUsers, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ClassRepDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pendingAssignments: 5,
    upcomingClasses: 3,
    newAnnouncements: 2,
    sharedNotes: 4
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-2xl shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Class Representative Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name || 'Class Representative'}</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Link
              to="/admin/announcements/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="h-4 w-4 mr-2" /> New Announcement
            </Link>
            <Link
              to="/admin/notes/add"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="h-4 w-4 mr-2" /> Share Notes
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pending Assignments */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-xl p-3">
                  <FaBook className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Pending Assignments
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.pendingAssignments}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-xl p-3">
                  <FaCalendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Upcoming Classes
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.upcomingClasses}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* New Announcements */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-xl p-3">
                  <FaBullhorn className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      New Announcements
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.newAnnouncements}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Shared Notes */}
          <div className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-xl p-3">
                  <FaFileAlt className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Shared Notes
                    </dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{stats.sharedNotes}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/admin/announcements"
              className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-100 rounded-xl p-3">
                    <FaBullhorn className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Manage Announcements</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Create, edit, or delete class announcements
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/notes"
              className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-xl p-3">
                    <FaFileAlt className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">Manage Notes</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Share and manage class notes
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link
              to="/timetable"
              className="bg-white overflow-hidden shadow-sm rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-xl p-3">
                    <FaCalendar className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900">View Timetable</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Check class schedules and events
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100">
            <ul className="divide-y divide-gray-100">
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                      <FaCheckCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      New assignment posted: Database Design Project
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Due in 7 days
                    </span>
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                      <FaExclamationTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      Class meeting scheduled for next week
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Tomorrow
                    </span>
                  </div>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                      <FaFileAlt className="h-4 w-4 text-purple-600" />
                    </div>
                    <p className="ml-3 text-sm font-medium text-gray-900">
                      New notes shared for Web Development course
                    </p>
                  </div>
                  <div className="ml-2 flex-shrink-0">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Today
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassRepDashboard; 