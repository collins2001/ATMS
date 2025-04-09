import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import timetableService from '../../../services/timetableService';
import { useAuth } from '../../../hooks/useAuth';
import { FaCalendar, FaClock, FaDoorOpen, FaBook, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ViewTt = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const response = await timetableService.getTimetable();
        console.log('Timetable response:', response);
        setTimetables(Array.isArray(response) ? response : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching timetables:', err);
        if (err.status === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to fetch timetables');
          setLoading(false);
        }
      }
    };

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
        console.error('Error deleting timetable:', err);
        if (err.status === 401) {
          navigate('/login');
        } else {
          setError(err.message || 'Failed to delete timetable entry');
        }
      }
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      {error}
    </div>
  );

  const isStudent = user?.role === 'student';

  // Define time slots in 2-hour intervals from 7 AM to 7 PM
  const timeSlots = [
    '7:00 - 9:00',
    '9:00 - 11:00',
    '11:00 - 13:00',
    '13:00 - 15:00',
    '15:00 - 17:00',
    '17:00 - 19:00'
  ];

  // Define days of the week
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Create a grid data structure
  const gridData = {};
  daysOfWeek.forEach(day => {
    gridData[day] = {};
    timeSlots.forEach(time => {
      gridData[day][time] = null;
    });
  });

  // Fill in the grid with timetable entries
  timetables.forEach(entry => {
    // Normalize the time format to match our grid format
    const startTime = entry.startTime.split(' ')[0]; // Remove AM/PM if present
    const dayOfWeek = entry.dayOfWeek;
    
    // Find the matching time slot
    const matchingTimeSlot = timeSlots.find(slot => {
      const [slotStart] = slot.split(' - ');
      const slotHour = parseInt(slotStart.split(':')[0]);
      const entryHour = parseInt(startTime.split(':')[0]);
      return slotHour === entryHour;
    });
    
    if (matchingTimeSlot && gridData[dayOfWeek]) {
      gridData[dayOfWeek][matchingTimeSlot] = entry;
    }
  });

  return (
    <div className="h-full bg-gray-50 p-3">
      <div className="max-w-full mx-auto">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Class Schedule</h1>
            <p className="text-xs text-gray-600">View and manage your class timetable</p>
          </div>
          {!isStudent && (
            <Link 
              to="/add-timetable"
              className="inline-flex items-center px-2 py-1 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 transition-colors duration-200"
            >
              <FaPlus className="h-3 w-3 mr-1" />
              Add New Entry
            </Link>
          )}
        </div>

        {timetables.length === 0 ? (
          <div className="text-center py-6 bg-white rounded-lg shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-base font-medium text-gray-700">No timetable entries</h3>
            <p className="text-xs text-gray-500">There are no classes scheduled at this time.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-1.5 py-1 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider w-24">
                      Time
                    </th>
                    {daysOfWeek.map(day => (
                      <th key={day} className="px-1.5 py-1 text-left text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {timeSlots.map(time => (
                    <tr key={time} className="hover:bg-gray-50">
                      <td className="px-1.5 py-1 whitespace-nowrap text-[11px] font-medium text-gray-900">
                        {time}
                      </td>
                      {daysOfWeek.map(day => {
                        const entry = gridData[day][time];
                        return (
                          <td key={`${day}-${time}`} className="px-1.5 py-1 whitespace-nowrap">
                            {entry ? (
                              <div className="bg-indigo-50 rounded p-1 hover:bg-indigo-100 transition-colors duration-200">
                                <div className="flex items-start space-x-1">
                                  <div className="flex-shrink-0">
                                    <FaBook className="h-2.5 w-2.5 text-indigo-600 mt-0.5" />
                                  </div>
                                  <div>
                                    <p className="text-[11px] font-medium text-gray-900 leading-tight">{entry.courseId}</p>
                                    <div className="flex items-center text-[10px] text-gray-500 leading-tight">
                                      <FaDoorOpen className="h-2.5 w-2.5 mr-0.5" />
                                      <span>Room {entry.room}</span>
                                    </div>
                                    {!isStudent && (
                                      <div className="flex space-x-1 mt-0.5">
                                        <button
                                          onClick={() => navigate(`/edit-timetable/${entry.id}`)}
                                          className="text-indigo-600 hover:text-indigo-900"
                                        >
                                          <FaEdit className="h-2.5 w-2.5" />
                                        </button>
                                        <button
                                          onClick={() => handleDelete(entry.id)}
                                          className="text-red-600 hover:text-red-900"
                                        >
                                          <FaTrash className="h-2.5 w-2.5" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="h-[52px]"></div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTt;
