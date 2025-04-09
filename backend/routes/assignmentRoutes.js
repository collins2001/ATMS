const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');

// Test route to add sample data
router.get('/test/add-samples', async (req, res) => {
  try {
    const sampleAssignments = [
      {
        title: "Test Assignment 1",
        description: "This is a test assignment",
        course: "CS101",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
      },
      {
        title: "Test Assignment 2",
        description: "Another test assignment",
        course: "CS102",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
      }
    ];

    const Assignment = require('../models/Assignment');
    await Assignment.bulkCreate(sampleAssignments);
    res.json({ message: "Sample assignments created" });
  } catch (error) {
    console.error('Error creating samples:', error);
    res.status(500).json({ error: "Failed to create samples" });
  }
});

// Basic CRUD operations
router.get('/', assignmentController.getAssignments);
router.get('/:id', assignmentController.getAssignment);
router.post('/', assignmentController.createAssignment);
router.put('/:id', assignmentController.updateAssignment);
router.delete('/:id', assignmentController.deleteAssignment);

// Additional routes
router.get('/course/:courseId', assignmentController.getAssignmentsByCourse);

module.exports = router; 