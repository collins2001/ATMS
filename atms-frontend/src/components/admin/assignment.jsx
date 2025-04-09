import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { useNavigate } from 'react-router-dom';

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const data = await assignmentService.getAssignments();
      console.log('Assignments response:', data); // Debug log
      setAssignments(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching assignments:', err); // Debug log
      if (err.status === 401) {
        navigate('/login');
      } else {
        setError(err.message || 'Failed to fetch assignments');
        setLoading(false);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      try {
        await assignmentService.deleteAssignment(id);
        // Refresh the assignments list
        fetchAssignments();
      } catch (err) {
        console.error('Error deleting assignment:', err);
        setError('Failed to delete assignment');
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h2>Assignments</h2>
        <Link 
          to="/addAssign" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Assignment
        </Link>
      </div>

      {assignments.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          No assignments found
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={tableHeaderStyle}>Title</th>
              <th style={tableHeaderStyle}>Description</th>
              <th style={tableHeaderStyle}>Course</th>
              <th style={tableHeaderStyle}>Due Date</th>
              <th style={tableHeaderStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tableCellStyle}>{assignment.title}</td>
                <td style={tableCellStyle}>{assignment.description}</td>
                <td style={tableCellStyle}>{assignment.course}</td>
                <td style={tableCellStyle}>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </td>
                <td style={tableCellStyle}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Link
                      to={`/editAssign/${assignment.id}`}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#2196F3',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px'
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(assignment.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd'
};

const tableCellStyle = {
  padding: '12px',
  textAlign: 'left'
};

export default Assignment;
