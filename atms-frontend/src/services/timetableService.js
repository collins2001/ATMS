import api from './api';

const timetableService = {
  getTimetable: async () => {
    return await api.get('/timetable');
  },

  getEvent: async (eventId) => {
    return await api.get(`/timetable/events/${eventId}`);
  },

  addEvent: async (eventData) => {
    return await api.post('/timetable/events', eventData);
  },

  updateEvent: async (eventId, eventData) => {
    return await api.put(`/timetable/events/${eventId}`, eventData);
  },

  deleteEvent: async (eventId) => {
    return await api.delete(`/timetable/events/${eventId}`);
  },

  getWeeklySchedule: async (date) => {
    return await api.get('/timetable/weekly', { params: { date } });
  },

  getMonthlySchedule: async (date) => {
    return await api.get('/timetable/monthly', { params: { date } });
  },

  getSettings: async () => {
    return await api.get('/timetable/settings');
  },

  updateSettings: async (settings) => {
    return await api.put('/timetable/settings', settings);
  }
};

export default timetableService; 