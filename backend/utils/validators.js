const { ROLES } = require('./constants');

exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.validatePassword = (password) => {
  return password.length >= 6;
};

exports.validateRole = (role) => {
  return Object.values(ROLES).includes(role);
};

exports.validateDate = (date) => {
  return !isNaN(Date.parse(date));
};

exports.validateTime = (time) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
  return timeRegex.test(time);
};

exports.validateDayOfWeek = (day) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.includes(day);
};

exports.schemas = {
  register: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, validate: exports.validateEmail },
    password: { type: 'string', required: true, validate: exports.validatePassword },
    role: { type: 'string', required: true, validate: exports.validateRole }
  },
  login: {
    email: { type: 'string', required: true },
    password: { type: 'string', required: true }
  },
  assignment: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    dueDate: { type: 'string', required: true, validate: exports.validateDate },
    course: { type: 'string', required: true }
  },
  announcement: {
    title: { type: 'string', required: true },
    content: { type: 'string', required: true },
    ImageURL: { type: 'string', required: false }
  },
  timetable: {
    courseId: { type: 'string', required: true },
    dayOfWeek: { type: 'string', required: true, validate: exports.validateDayOfWeek },
    startTime: { type: 'string', required: true, validate: exports.validateTime },
    endTime: { type: 'string', required: true, validate: exports.validateTime },
    room: { type: 'string', required: true }
  },
  notification: {
    title: { type: 'string', required: true },
    message: { type: 'string', required: true },
    type: { type: 'string', required: true }
  },
  note: {
    course: { type: 'string', required: true },
    title: { type: 'string', required: true },
    description: { type: 'string', required: false },
    fileUrl: { type: 'string', required: false }
  },
  user: {
    name: { type: 'string', required: true },
    email: { type: 'string', required: true, validate: exports.validateEmail },
    role: { type: 'string', required: true, validate: exports.validateRole }
  },
  timetableBulk: {
    entries: {
      type: 'array',
      required: true,
      validate: (entries) => {
        if (!Array.isArray(entries) || entries.length === 0) return false;
        return entries.every(entry => {
          return (
            typeof entry === 'object' &&
            typeof entry.courseId === 'string' &&
            typeof entry.dayOfWeek === 'string' && exports.validateDayOfWeek(entry.dayOfWeek) &&
            typeof entry.startTime === 'string' && exports.validateTime(entry.startTime) &&
            typeof entry.endTime === 'string' && exports.validateTime(entry.endTime) &&
            typeof entry.room === 'string'
          );
        });
      }
    }
  }
}; 