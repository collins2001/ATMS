import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEye, FaEdit, FaTrash, FaCalendarAlt, FaImage, FaBullhorn } from 'react-icons/fa';

const ViewAllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching announcements');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/announcements/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Announcement deleted successfully');
        fetchAnnouncements();
      } catch (error) {
        toast.error('Error deleting announcement');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="mt-2 text-gray-600">Manage and view all class announcements</p>
          </div>
          <Link
            to="/admin/announcements/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add New Announcement
          </Link>
        </div>

        {announcements.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center">
              <FaBullhorn className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-700">No announcements yet</h3>
            <p className="mt-2 text-gray-500">Create your first announcement to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div 
                key={announcement.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                {announcement.ImageURL ? (
                  <div className="relative h-48">
                    <img
                      src={announcement.ImageURL}
                      alt={announcement.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                    <FaImage className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{announcement.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {announcement.content.length > 100
                      ? `${announcement.content.substring(0, 100)}...`
                      : announcement.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaCalendarAlt className="h-4 w-4 mr-1" />
                    <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <Link
                      to={`/admin/announcements/view/${announcement.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors duration-200 hover:bg-indigo-50 rounded-md"
                    >
                      <FaEye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <Link
                      to={`/admin/announcements/edit/${announcement.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-600 hover:text-yellow-900 transition-colors duration-200 hover:bg-yellow-50 rounded-md"
                    >
                      <FaEdit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-900 transition-colors duration-200 hover:bg-red-50 rounded-md"
                    >
                      <FaTrash className="h-4 w-4 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewAllAnnouncements;
