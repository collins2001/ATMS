const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Basic CRUD operations
router.get('/', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignments);
router.get('/:id', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignment);
router.post('/', 
    authorize([ROLES.ADMIN]), 
    validateRequest('assignment'), 
    assignmentController.createAssignment
);
router.put('/:id', 
    authorize([ROLES.ADMIN]), 
    validateRequest('assignment'), 
    assignmentController.updateAssignment
);
router.delete('/:id', 
    authorize([ROLES.ADMIN]), 
    assignmentController.deleteAssignment
);

// Specialized routes
router.get('/upcoming', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getUpcomingAssignments);
router.get('/course/:course', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), assignmentController.getAssignmentsByCourse);

module.exports = router; 