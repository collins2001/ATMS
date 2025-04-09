import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEye, FaEdit, FaTrash, FaBook, FaFileAlt, FaClock } from 'react-icons/fa';
import { noteService } from '../../../services/noteService';

const ViewAllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching notes...');
      const response = await noteService.getNotes();
      console.log('Notes response:', response);
      
      // Check if response is an array
      if (Array.isArray(response)) {
        setNotes(response);
      } 
      // Check if response has a data property that's an array
      else if (response && Array.isArray(response.data)) {
        setNotes(response.data);
      }
      // If response is an object with notes property
      else if (response && Array.isArray(response.notes)) {
        setNotes(response.notes);
      }
      else {
        console.error('Unexpected response format:', response);
        setError('Invalid response format from server');
        setNotes([]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError(error.message || 'Error fetching notes');
      toast.error('Error fetching notes');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteService.deleteNote(id);
        toast.success('Note deleted successfully');
        fetchNotes();
      } catch (error) {
        toast.error('Error deleting note');
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Class Notes</h1>
            <p className="text-red-500 mt-2">{error}</p>
            <button 
              onClick={fetchNotes}
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Class Notes</h1>
            <p className="mt-2 text-gray-600">Manage and view all class notes</p>
          </div>
          <Link
            to="/admin/notes/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
          >
            <FaPlus className="h-4 w-4 mr-2" />
            Add New Note
          </Link>
        </div>

        {!notes || notes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-center">
              <FaBook className="h-16 w-16 text-gray-300" />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-700">No notes available</h3>
            <p className="mt-2 text-gray-500">Create your first class note to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div 
                key={note.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">{note.title}</h2>
                    <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                      {note.course}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {note.description?.length > 150
                      ? `${note.description.substring(0, 150)}...`
                      : note.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <FaClock className="h-4 w-4 mr-1" />
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <Link
                      to={`/admin/notes/view/${note.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-900 transition-colors duration-200 hover:bg-indigo-50 rounded-md"
                    >
                      <FaEye className="h-4 w-4 mr-1" />
                      View
                    </Link>
                    <Link
                      to={`/admin/notes/edit/${note.id}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-yellow-600 hover:text-yellow-900 transition-colors duration-200 hover:bg-yellow-50 rounded-md"
                    >
                      <FaEdit className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(note.id)}
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

export default ViewAllNotes;
