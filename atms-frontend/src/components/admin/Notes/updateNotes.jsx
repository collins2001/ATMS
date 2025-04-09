import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noteService } from '../../../services/noteService';
import { toast } from 'react-toastify';

const UpdateNotes = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError('');
      try {
        const noteData = await noteService.getNote(id);
        if (noteData) {
          setFormData(noteData);
        } else {
          throw new Error('Note data not found in response');
        }
      } catch (error) {
        console.error('Error fetching note details:', error);
        const errorMessage = error.message || 'Error fetching note details';
        toast.error(errorMessage);
        setError(errorMessage);
        if (error.response?.status === 404) {
           toast.error('Note not found.');
           navigate('/admin/notes');
        } else if (error.response?.status === 401) {
          navigate('/login');
        } else {
           // navigate('/admin/notes'); 
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
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

    try {
      await noteService.updateNote(id, formData);
      toast.success('Note updated successfully!');
      navigate('/admin/notes');
    } catch (error) {
      console.error('Error updating note:', error);
      if (error.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
      } else {
          const errorMessage = error.response?.data?.message || error.message || 'Error updating note';
          toast.error(errorMessage);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading note details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">Error: {error}</div>
        <button onClick={() => navigate('/admin/notes')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded">Back to Notes</button>
      </div>
    );
  }
  
  if (!formData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Note data could not be loaded.</div>
         <button onClick={() => navigate('/admin/notes')} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded">Back to Notes</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Update Note</h2>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Course
          </label>
          <input
            type="text"
            name="course"
            value={formData.course || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            File URL
          </label>
          <input
            type="url"
            name="fileUrl"
            value={formData.fileUrl || ''}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Note
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/notes')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateNotes;
