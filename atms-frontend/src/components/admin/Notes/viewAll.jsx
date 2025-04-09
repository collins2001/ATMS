import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noteService } from '../../../services/noteService';
import { toast } from 'react-toastify';

const ViewAllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await noteService.getNotes();
      console.log('Notes response:', response); // Debug log
      setNotes(Array.isArray(response) ? response : []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notes:', error); // Debug log
      toast.error('Error fetching notes');
      setNotes([]); // Set empty array on error
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Notes</h2>
        <button
          onClick={() => navigate('/notes/add')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add New Note
        </button>
      </div>
      
      {!notes || notes.length === 0 ? (
        <div className="text-center text-gray-600">No notes found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{note.title}</div>
                <p className="text-gray-600 text-sm mb-2">Course: {note.course}</p>
                <p className="text-gray-700 text-base mb-4">
                  {note.description.length > 100
                    ? `${note.description.substring(0, 100)}...`
                    : note.description}
                </p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => navigate(`/admin/notes/view/${note.id}`)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/admin/notes/edit/${note.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => navigate(`/admin/notes/delete/${note.id}`)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAllNotes;
