const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'course_id'
  },
  dayOfWeek: {
    type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    allowNull: false,
    field: 'day_of_week'
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'start_time'
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
    field: 'end_time'
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'timetables',
  timestamps: true,
  underscored: true
});

// Add any associations here if needed
// For example:
// Timetable.belongsTo(Course, { foreignKey: 'courseId' });

module.exports = Timetable; 