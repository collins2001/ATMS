import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import timetableService from '../../../services/timetableService';
import { toast } from 'react-toastify';

const EditTt = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTimetable = async () => {
      setLoading(true);
      setError('');
      try {
        const timetableData = await timetableService.getEvent(id);
        console.log('Fetched timetable data:', timetableData);
        
        if (!timetableData) {
          throw new Error('Timetable data not found in response');
        }
        
        setFormData(timetableData);

      } catch (err) {
        console.error('Error fetching timetable:', err);
        const errorMessage = err.message || 'Failed to fetch timetable entry';
        toast.error(errorMessage);
        setError(errorMessage);
        if (err.response?.status === 404) {
            toast.error('Timetable entry not found.');
            navigate('/timetable');
        } else if (err.response?.status === 401) {
            toast.error('Unauthorized. Please log in again.');
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;
    
    try {
      await timetableService.updateEvent(id, formData);
      toast.success('Timetable entry updated successfully!');
      navigate('/timetable');
    } catch (err) {
      console.error('Error updating timetable:', err);
      if (err.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
      } else {
          const errorMessage = err.response?.data?.message || err.message || 'Failed to update timetable entry';
          toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading timetable details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
        <button onClick={() => navigate('/timetable')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back to Timetable
        </button>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Timetable data could not be loaded.</div>
        <button onClick={() => navigate('/timetable')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back to Timetable
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Edit Timetable Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="courseId">
              Course ID
            </label>
            <input
              type="text"
              id="courseId"
              name="courseId"
              value={formData.courseId || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="dayOfWeek">
              Day of Week
            </label>
            <select
              id="dayOfWeek"
              name="dayOfWeek"
              value={formData.dayOfWeek || ''}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="startTime">
              Start Time
            </label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="endTime">
              End Time
            </label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="room">
              Room
            </label>
            <input
              type="text"
              id="room"
              name="room"
              value={formData.room || ''}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Entry
            </button>
            <button
              type="button"
              onClick={() => navigate('/timetable')}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTt;
