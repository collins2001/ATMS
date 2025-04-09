import api from './api';

const timetableService = {
  getTimetable: async () => {
    const response = await api.get('/timetables');
    return response; // api interceptor already returns response.data
  },

  getEvent: async (eventId) => {
    const response = await api.get(`/timetables/${eventId}`);
    return response;
  },

  addEvent: async (eventData) => {
    const response = await api.post('/timetables', eventData);
    return response;
  },

  updateEvent: async (eventId, eventData) => {
    const response = await api.put(`/timetables/${eventId}`, eventData);
    return response;
  },

  deleteEvent: async (eventId) => {
    const response = await api.delete(`/timetables/${eventId}`);
    return response;
  },

  getTimetableByCourse: async (courseId) => {
    const response = await api.get(`/timetables/course/${courseId}`);
    return response;
  },

  getTimetableByDay: async (day) => {
    const response = await api.get(`/timetables/day/${day}`);
    return response;
  },

  getTimetableByRoom: async (room) => {
    const response = await api.get(`/timetables/room/${room}`);
    return response;
  },

  bulkCreateEvents: async (entries) => {
    const response = await api.post('/timetables/bulk', { entries });
    return response;
  },

  checkRoomAvailability: async (room, date, startTime, endTime) => {
    const response = await api.get(`/timetables/availability/${room}`, {
      params: { date, startTime, endTime }
    });
    return response;
  },

  getWeeklySchedule: async (date) => {
    const response = await api.get('/timetables/weekly', { params: { date } });
    return response;
  },

  getMonthlySchedule: async (date) => {
    const response = await api.get('/timetables/monthly', { params: { date } });
    return response;
  },

  getSettings: async () => {
    const response = await api.get('/timetables/settings');
    return response;
  },

  updateSettings: async (settings) => {
    const response = await api.put('/timetables/settings', settings);
    return response;
  }
};

export default timetableService; 