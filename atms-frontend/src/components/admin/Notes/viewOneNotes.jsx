import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { noteService } from '../../../services/noteService';
import { toast } from 'react-toastify';
import { useAuth } from '../../../hooks/useAuth';

const ViewOneNotes = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const backPath = user?.role === 'student' ? '/student/notes' : '/admin/notes';

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError('');
      try {
        const noteData = await noteService.getNote(id);
        if (!noteData) {
            throw new Error('Note data not found in response');
        }
        setNote(noteData);
      } catch (error) {
        console.error('Error fetching note details:', error);
        const errorMessage = error.message || 'Error fetching note details';
        toast.error(errorMessage);
        setError(errorMessage);
        if (error.response?.status === 404) {
           toast.error('Note not found.');
           navigate(backPath);
        } else if (error.response?.status === 401) {
          toast.error('Unauthorized. Please log in again.');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, navigate, backPath]);

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
        <button onClick={() => navigate(backPath)} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back
        </button>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Note data could not be loaded.</div>
         <button onClick={() => navigate(backPath)} className="mt-4 block mx-auto px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors">
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold mb-4">{note.title}</h2>
          <div className="mb-4">
            <span className="font-bold">Course:</span>
            <span className="ml-2">{note.course}</span>
          </div>
          <div className="mb-4">
            <span className="font-bold">Description:</span>
            <p className="mt-2 text-gray-700">{note.description}</p>
          </div>
          {note.fileUrl && (
            <div className="mb-4">
              <span className="font-bold">File:</span>
              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-500 hover:text-blue-700 underline"
              >
                View/Download File
              </a>
            </div>
          )}
        </div>
        <div className="px-6 py-4 bg-gray-50 flex justify-between">
          <button
            onClick={() => navigate(backPath)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </button>
          {(user?.role === 'admin' || user?.role === 'class_rep') && (
             <button
               onClick={() => navigate(`/admin/notes/edit/${id}`)}
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
             >
               Edit Note
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOneNotes;
