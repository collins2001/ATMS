import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import timetableService from '../../../services/timetableService';

const ViewTt = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await timetableService.getTimetable();
        console.log('Timetable response:', response); // Debug log
        setTimetables(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching timetables:', err); // Debug log
        if (err.status === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to fetch timetables');
          setLoading(false);
        }
      }
    };

    // Check for token before fetching
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetchTimetables();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this timetable entry?')) {
      try {
        await timetableService.deleteEvent(id);
        setTimetables(timetables.filter(tt => tt.id !== id));
      } catch (err) {
        console.error('Error deleting timetable:', err); // Debug log
        if (err.status === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to delete timetable entry');
        }
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center p-4">
      {error}
    </div>
  );

  // Add debug rendering
  if (!Array.isArray(timetables) || timetables.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Timetable Management</h2>
          <Link 
            to="/add-timetable"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Entry
          </Link>
        </div>
        <p className="text-center text-gray-600">No timetable entries found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Timetable Management</h2>
        <Link 
          to="/add-timetable"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Entry
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 border-b">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day of Week</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timetables.map((timetable) => (
              <tr key={timetable.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{timetable.courseId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{timetable.dayOfWeek}</td>
                <td className="px-6 py-4 whitespace-nowrap">{timetable.startTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{timetable.endTime}</td>
                <td className="px-6 py-4 whitespace-nowrap">{timetable.room}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => navigate(`/edit-timetable/${timetable.id}`)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(timetable.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewTt;
