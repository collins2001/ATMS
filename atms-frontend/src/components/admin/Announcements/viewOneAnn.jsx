import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { announcementService } from '../../../services/announcementService';
import { toast } from 'react-toastify';

const ViewOneAnnouncement = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    fetchAnnouncement();
  }, []);

  const fetchAnnouncement = async () => {
    try {
      const response = await announcementService.getAnnouncement(id);
      setAnnouncement(response);
    } catch (error) {
      toast.error('Error fetching announcement');
      navigate('/admin/announcements');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        await announcementService.deleteAnnouncement(id);
        toast.success('Announcement deleted successfully');
        navigate('/admin/announcements');
      } catch (error) {
        toast.error('Error deleting announcement');
      }
    }
  };

  if (!announcement) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {announcement.ImageURL && (
          <img
            src={announcement.ImageURL}
            alt={announcement.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{announcement.title}</h1>
          <p className="text-gray-700 whitespace-pre-wrap mb-6">{announcement.content}</p>
          <div className="text-sm text-gray-500 mb-6">
            Created: {new Date(announcement.createdAt).toLocaleDateString()}
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/admin/announcements')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Back to List
            </button>
            <div className="space-x-2">
              <Link
                to={`/admin/announcements/edit/${id}`}
                className="inline-block px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOneAnnouncement;
