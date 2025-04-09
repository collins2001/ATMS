import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { FaBook, FaCalendar, FaBullhorn, FaFileAlt, FaClock, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { assignmentService } from '../../services/assignmentService';
import { announcementService } from '../../services/announcementService';
import { noteService } from '../../services/noteService';
import { toast } from 'react-toastify';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    pendingAssignments: 0,
    upcomingClasses: 0,
    newAnnouncements: 0,
    sharedNotes: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch assignments
      const assignments = await assignmentService.getAssignments();
      const pendingAssignments = assignments.filter(assignment => 
        new Date(assignment.dueDate) > new Date() && 
        assignment.status !== 'submitted' && 
        assignment.status !== 'graded'
      );

      // Fetch announcements
      const announcements = await announcementService.getAnnouncements();
      const newAnnouncements = announcements.filter(announcement => 
        new Date(announcement.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
      );

      // Fetch notes
      const notes = await noteService.getNotes();
      const sharedNotes = notes.filter(note => 
        new Date(note.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
      );

      setStats({
        pendingAssignments: pendingAssignments.length,
        upcomingClasses: 0, // This would need to be fetched from a timetable service
        newAnnouncements: newAnnouncements.length,
        sharedNotes: sharedNotes.length
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Error loading dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Student'}!</h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your academic journey today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Pending Assignments Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-indigo-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                <FaBook className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Assignments</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pendingAssignments}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="h-4 w-4 mr-1" />
                <span>Due this week</span>
              </div>
            </div>
          </div>

          {/* Upcoming Classes Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-green-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <FaCalendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Upcoming Classes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.upcomingClasses}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <FaCheckCircle className="h-4 w-4 mr-1" />
                <span>Next 24 hours</span>
              </div>
            </div>
          </div>

          {/* New Announcements Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-yellow-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                <FaBullhorn className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">New Announcements</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.newAnnouncements}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <FaExclamationTriangle className="h-4 w-4 mr-1" />
                <span>Last 7 days</span>
              </div>
            </div>
          </div>

          {/* Shared Notes Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-purple-100">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <FaFileAlt className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Shared Notes</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.sharedNotes}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm text-gray-500">
                <FaCheckCircle className="h-4 w-4 mr-1" />
                <span>Last 30 days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
              to="/assignments"
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-indigo-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3 group-hover:bg-indigo-200 transition-colors duration-300">
                  <FaBook className="h-6 w-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">View Assignments</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Check your pending and completed assignments
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/student/announcements"
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-yellow-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3 group-hover:bg-yellow-200 transition-colors duration-300">
                  <FaBullhorn className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">View Announcements</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Read class announcements and updates
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/timetable"
              className="group bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-300 hover:border-green-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-lg p-3 group-hover:bg-green-200 transition-colors duration-300">
                  <FaCalendar className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-300">View Timetable</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Check class schedules and events
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {stats.pendingAssignments > 0 && (
                <li className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-lg p-2">
                        <FaBook className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">New assignment posted</p>
                        <p className="text-sm text-gray-500">Database Design Project</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Due in 7 days
                    </span>
                  </div>
                </li>
              )}
              {stats.upcomingClasses > 0 && (
                <li className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-lg p-2">
                        <FaCalendar className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Class meeting scheduled</p>
                        <p className="text-sm text-gray-500">For next week</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Tomorrow
                    </span>
                  </div>
                </li>
              )}
              {stats.sharedNotes > 0 && (
                <li className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 rounded-lg p-2">
                        <FaFileAlt className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">New notes shared</p>
                        <p className="text-sm text-gray-500">Web Development course</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Today
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 