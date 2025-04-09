import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewAllAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/announcements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnnouncements(response.data);
    } catch (error) {
      toast.error('Error fetching announcements');
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Announcements</h1>
        <Link
          to="/admin/announcements/add"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add New Announcement
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            {announcement.ImageURL && (
              <img
                src={announcement.ImageURL}
                alt={announcement.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
              <p className="text-gray-600 mb-4">
                {announcement.content.length > 100
                  ? `${announcement.content.substring(0, 100)}...`
                  : announcement.content}
              </p>
              <div className="text-sm text-gray-500 mb-4">
                Created: {new Date(announcement.createdAt).toLocaleDateString()}
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={`/admin/announcements/view/${announcement.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  View
                </Link>
                <Link
                  to={`/admin/announcements/edit/${announcement.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(announcement.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllAnnouncements;
