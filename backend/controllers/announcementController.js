const announcementService = require('../services/announcementService');

exports.createAnnouncement = async (req, res, next) => {
  try {
    const announcement = await announcementService.create(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    next(error);
  }
};

exports.getAnnouncements = async (req, res, next) => {
  try {
    const announcements = await announcementService.findAll();
    res.json(announcements);
  } catch (error) {
    next(error);
  }
};

exports.getAnnouncement = async (req, res, next) => {
  try {
    const announcement = await announcementService.findById(req.params.id);
    res.json(announcement);
  } catch (error) {
    if (error.message === 'Announcement not found') {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      next(error);
    }
  }
};

exports.updateAnnouncement = async (req, res, next) => {
  try {
    const announcement = await announcementService.update(req.params.id, req.body);
    res.json(announcement);
  } catch (error) {
    if (error.message === 'Announcement not found') {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      next(error);
    }
  }
};

exports.deleteAnnouncement = async (req, res, next) => {
  try {
    const result = await announcementService.delete(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Announcement not found') {
      res.status(404).json({ error: 'Announcement not found' });
    } else {
      next(error);
    }
  }
}; 