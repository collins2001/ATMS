const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Basic CRUD operations
router.get('/', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), timetableController.getTimetables);
router.get('/:id', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), timetableController.getTimetableById);
router.post('/', 
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  validateRequest('timetable'),
  timetableController.createTimetable
);
router.put('/:id', 
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  validateRequest('timetable'),
  timetableController.updateTimetable
);
router.delete('/:id', 
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  timetableController.deleteTimetable
);

// Specialized routes
router.get('/course/:courseId', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), timetableController.getTimetablesByCourse);
router.get('/day/:dayOfWeek', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), timetableController.getTimetablesByDay);
router.get('/room/:room', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), timetableController.getTimetablesByRoom);
router.get('/availability/:room', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), timetableController.checkRoomAvailability);

// Bulk operations
router.post('/bulk', 
  authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
  validateRequest('timetableBulk'),
  timetableController.bulkCreateTimetables
);

module.exports = router; 