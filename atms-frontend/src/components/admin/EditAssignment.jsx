import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { toast } from 'react-toastify';

const EditAssignment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignment = async () => {
      setLoading(true);
      setError('');
      try {
        const assignmentData = await assignmentService.getAssignment(id);
        console.log('Fetched assignment data:', assignmentData);

        if (!assignmentData) {
          throw new Error('Assignment data not found in response');
        }

        let formattedDate = '';
        if (assignmentData.dueDate) {
          const date = new Date(assignmentData.dueDate);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().slice(0, 16);
          }
        }

        setFormData({
          ...assignmentData,
          dueDate: formattedDate,
        });

      } catch (err) {
        console.error('Error fetching assignment:', err);
        const errorMessage = err.message || 'Failed to fetch assignment';
        toast.error(errorMessage);
        setError(errorMessage);
        if (err.response?.status === 404) {
          toast.error('Assignment not found.');
          navigate('/assignments');
        } else if (err.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchAssignment();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData) return;

    const dataToSubmit = {
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null
    };

    try {
      await assignmentService.updateAssignment(id, dataToSubmit);
      toast.success('Assignment updated successfully!');
      navigate('/assignments');
    } catch (err) {
      console.error('Error updating assignment:', err);
      if (err.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to update assignment';
        toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading assignment details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
        <button onClick={() => navigate('/assignments')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back to Assignments
        </button>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Assignment data could not be loaded.</div>
        <button onClick={() => navigate('/assignments')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back to Assignments
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Edit Assignment</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
            <input
              type="datetime-local"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate || ''}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="fileUrl" className="block text-sm font-medium text-gray-700 mb-1">File URL</label>
            <input
              type="url"
              id="fileUrl"
              name="fileUrl"
              value={formData.fileUrl || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/assignments')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Update Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssignment; 