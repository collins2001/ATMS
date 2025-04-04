const Notification = require('../models/Notification');

class NotificationService {
  async create(notificationData) {
    return Notification.create(notificationData);
  }

  async findAll(userId) {
    return Notification.findAll({
      where: { userId },
      order: [['timestamp', 'DESC']]
    });
  }

  async findById(id) {
    return Notification.findByPk(id);
  }

  async update(id, notificationData) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification.update(notificationData);
  }

  async delete(id) {
    const notification = await Notification.findByPk(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    return notification.destroy();
  }
}

module.exports = new NotificationService(); 