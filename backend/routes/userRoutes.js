const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken, authorize } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');
const { ROLES } = require('../utils/constants');

// Apply authentication middleware to all routes
router.use(authenticateToken);

// User profile routes
router.get('/profile/me', userController.getUser);
router.put('/profile/me', validateRequest('user'), userController.updateProfile);
router.put('/profile/password', validateRequest('login'), userController.changePassword);

// User routes (available to admin and class reps only)
router.get('/', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), userController.getUsers);
router.post('/', authorize([ROLES.ADMIN]), validateRequest('user'), userController.createUser);
router.get('/:id', authorize([ROLES.ADMIN, ROLES.CLASS_REP]), userController.getUser);
router.put('/:id', authorize([ROLES.ADMIN]), validateRequest('user'), userController.updateUser);
router.delete('/:id', authorize([ROLES.ADMIN]), userController.deleteUser);

module.exports = router; 