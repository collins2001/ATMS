const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Basic CRUD operations
router.get('/', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), announcementController.getAnnouncements);
router.get('/:id', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), announcementController.getAnnouncement);

// Admin-only routes
router.post('/',
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
    validateRequest('announcement'),
    announcementController.createAnnouncement
);
router.put('/:id',
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
    validateRequest('announcement'),
    announcementController.updateAnnouncement
);
router.delete('/:id',
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]),
    announcementController.deleteAnnouncement
);

module.exports = router; 