const User = require('./User');
const Assignment = require('./Assignment');
const Announcement = require('./Announcement');
const Timetable = require('./Timetable');
const Notification = require('./Notification');
const Note = require('./Note');

// User relationships
User.hasMany(Assignment);
Assignment.belongsTo(User);

User.hasMany(Note);
Note.belongsTo(User);

User.hasMany(Notification);
Notification.belongsTo(User);

// Timetable relationships
User.hasMany(Timetable);
Timetable.belongsTo(User);

// Announcement relationships
User.hasMany(Announcement, { foreignKey: 'createdBy' });
Announcement.belongsTo(User, { foreignKey: 'createdBy' });

module.exports = {
  User,
  Assignment,
  Announcement,
  Timetable,
  Notification,
  Note
}; 