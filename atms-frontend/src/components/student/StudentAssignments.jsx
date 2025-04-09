import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { toast } from 'react-toastify';
import { FaBook, FaCalendar, FaDownload, FaEye } from 'react-icons/fa';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      console.log('Fetching assignments...');
      const response = await assignmentService.getAssignments();
      console.log('Assignments response:', response);
      
      // Check if response is an array
      if (Array.isArray(response)) {
        setAssignments(response);
      } 
      // Check if response has a data property that's an array
      else if (response && Array.isArray(response.data)) {
        setAssignments(response.data);
      }
      // If response is an object with assignments property
      else if (response && Array.isArray(response.assignments)) {
        setAssignments(response.assignments);
      }
      else {
        console.error('Unexpected response format:', response);
        setError('Invalid response format from server');
        setAssignments([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      setError(error.message || 'Error fetching assignments');
      toast.error('Error fetching assignments');
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'graded':
        return 'bg-blue-100 text-blue-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'Not Started';
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Assignments</h1>
            <p className="text-red-500 mt-2">{error}</p>
            <button 
              onClick={fetchAssignments}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Assignments</h1>
          <p className="text-gray-500 mt-2">View and manage your course assignments</p>
        </div>

        {assignments.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-center">
              <FaBook className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-700">No assignments available</h3>
            <p className="mt-2 text-gray-500">There are no assignments posted at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <div 
                key={assignment.id} 
                className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-xl p-3">
                      <FaBook className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold text-gray-900">{assignment.title}</h2>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{assignment.description}</p>

                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendar className="h-5 w-5 mr-1 text-gray-400" />
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                        {formatStatus(assignment.status)}
                      </span>

                      <div className="flex space-x-3">
                        <Link
                          to={`/assignments/view/${assignment.id}`}
                          className="text-indigo-600 hover:text-indigo-800 flex items-center text-sm font-medium transition-colors duration-200"
                        >
                          <FaEye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                        {assignment.fileUrl && (
                          <a
                            href={assignment.fileUrl}
                            download
                            className="text-green-600 hover:text-green-800 flex items-center text-sm font-medium transition-colors duration-200"
                          >
                            <FaDownload className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        )}
                      </div>
                    </div>
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

export default StudentAssignments; 