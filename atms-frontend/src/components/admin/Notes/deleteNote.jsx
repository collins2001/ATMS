import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { noteService } from '../../../services/noteService';
import { toast } from 'react-toastify';

const DeleteNotes = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await noteService.getNote(id);
        setNote(noteData);
      } catch (error) {
        console.error('Error fetching note details:', error);
        toast.error(error.message || 'Error fetching note details');
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          navigate('/admin/notes');
        }
      }
    };
    fetchNote();
  }, [id, navigate]);

  const handleDelete = async () => {
    try {
      await noteService.deleteNote(id);
      toast.success('Note deleted successfully!');
      navigate('/admin/notes');
    } catch (error) {
      console.error('Error deleting note:', error);
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please log in again.');
        navigate('/login');
      } else {
        toast.error(error.response?.data?.message || 'Error deleting note');
      }
    }
  };

  if (!note) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-4">Delete Note</h2>
          <div className="mb-4">
            <p className="text-red-600 font-bold">
              Are you sure you want to delete this note?
            </p>
          </div>
          <div className="mb-4">
            <span className="font-bold">Title:</span>
            <span className="ml-2">{note.title}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Course:</span>
            <span className="ml-2">{note.course}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Description:</span>
            <p className="mt-2 text-gray-700">{note.description}</p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => navigate('/admin/notes')}
            className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNotes;
