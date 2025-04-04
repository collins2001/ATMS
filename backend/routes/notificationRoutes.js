const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { validateRequest } = require('../middlewares/validationMiddleware');

// Apply authentication middleware to all routes
router.use(authenticateToken);

router.post('/', validateRequest('notification'), notificationController.createNotification);
router.get('/', notificationController.getNotifications);
router.get('/:id', notificationController.getNotification);
router.put('/:id', validateRequest('notification'), notificationController.updateNotification);
router.delete('/:id', notificationController.deleteNotification);

module.exports = router; 