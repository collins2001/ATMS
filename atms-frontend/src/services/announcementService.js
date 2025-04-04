import api from './api';

export const announcementService = {
  async getAnnouncements() {
    return api.get('/announcements');
  },

  async getAnnouncement(id) {
    return api.get(`/announcements/${id}`);
  },

  async createAnnouncement(announcementData) {
    return api.post('/announcements', announcementData);
  },

  async updateAnnouncement(id, announcementData) {
    return api.put(`/announcements/${id}`, announcementData);
  },

  async deleteAnnouncement(id) {
    return api.delete(`/announcements/${id}`);
  }
}; 