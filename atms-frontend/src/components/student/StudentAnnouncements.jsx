import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { announcementService } from '../../services/announcementService';
import { toast } from 'react-toastify';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await announcementService.getAnnouncements();
      setAnnouncements(response);
      setLoading(false);
    } catch (error) {
      toast.error('Error fetching announcements');
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>
      
      {announcements.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-500">No announcements available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {announcement.ImageURL && (
                <img
                  src={announcement.ImageURL}
                  alt={announcement.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{announcement.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{announcement.content}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(announcement.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/admin/announcements/view/${announcement.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentAnnouncements; 