const Announcement = require('../models/Announcement');

class AnnouncementService {
  async create(announcementData) {
    return Announcement.create(announcementData);
  }

  async findAll() {
    return Announcement.findAll({
      order: [['timestamp', 'DESC']]
    });
  }

  async findById(id) {
    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      throw new Error('Announcement not found');
    }
    return announcement;
  }

  async update(id, announcementData) {
    const announcement = await this.findById(id);
    return announcement.update(announcementData);
  }

  async delete(id) {
    const announcement = await this.findById(id);
    await announcement.destroy();
    return { message: 'Announcement deleted successfully' };
  }
}

module.exports = new AnnouncementService(); 