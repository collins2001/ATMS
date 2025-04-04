const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Basic CRUD operations
router.get('/', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), noteController.getNotes);
router.get('/:id', authorize([ROLES.ADMIN, ROLES.CLASS_REP, ROLES.STUDENT]), noteController.getNote);
router.post('/', 
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]), 
    validateRequest('note'), 
    noteController.createNote
);
router.put('/:id', 
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]), 
    validateRequest('note'), 
    noteController.updateNote
);
router.delete('/:id', 
    authorize([ROLES.ADMIN, ROLES.CLASS_REP]), 
    noteController.deleteNote
);

module.exports = router; 