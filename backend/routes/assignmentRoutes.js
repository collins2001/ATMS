const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

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

// Get all assignments - accessible by all authenticated users
router.get('/', authenticateToken, authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignments);

// Get single assignment - accessible by all authenticated users
router.get('/:id', authenticateToken, authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignment);

// Create assignment - restricted to admin and class rep
router.post('/', 
  authenticateToken,
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  validateRequest('assignment'),
  assignmentController.createAssignment
);

// Update assignment - restricted to admin and class rep
router.put('/:id', 
  authenticateToken,
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  validateRequest('assignment'),
  assignmentController.updateAssignment
);

// Delete assignment - restricted to admin and class rep
router.delete('/:id', 
  authenticateToken,
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  assignmentController.deleteAssignment
);

// Additional routes
router.get('/course/:courseId', authenticateToken, authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignmentsByCourse);
router.get('/upcoming', authenticateToken, authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getUpcomingAssignments);

module.exports = router; 