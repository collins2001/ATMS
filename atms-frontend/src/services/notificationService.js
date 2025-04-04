import api from './api';

const notificationService = {
  getNotifications: async () => {
    return await api.get('/notifications');
  },

  getUnreadCount: async () => {
    return await api.get('/notifications/unread/count');
  },

  markAsRead: async (notificationId) => {
    return await api.put(`/notifications/${notificationId}/read`);
  },

  markAllAsRead: async () => {
    return await api.put('/notifications/read-all');
  },

  deleteNotification: async (notificationId) => {
    return await api.delete(`/notifications/${notificationId}`);
  },

  getSettings: async () => {
    return await api.get('/notifications/settings');
  },

  updateSettings: async (settings) => {
    return await api.put('/notifications/settings', settings);
  }
};

export default notificationService; 