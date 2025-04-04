const { Op } = require('sequelize');
const Timetable = require('../models/Timetable');
const sequelize = require('../config/db');

class TimetableService {
  async findAll(filters = {}) {
    const { courseId, dayOfWeek, room } = filters;
    
    const where = {};
    if (courseId) where.courseId = courseId;
    if (dayOfWeek) where.dayOfWeek = dayOfWeek;
    if (room) where.room = room;

    return await Timetable.findAll({
      where,
      order: [['dayOfWeek', 'ASC'], ['startTime', 'ASC']]
    });
  }

  async findById(id) {
    const timetable = await Timetable.findByPk(id);
    if (!timetable) {
      throw new Error('Timetable entry not found');
    }
    return timetable;
  }

  async findByCourse(courseId) {
    return await Timetable.findAll({
      where: { courseId },
      order: [['dayOfWeek', 'ASC'], ['startTime', 'ASC']]
    });
  }

  async findByDay(dayOfWeek) {
    return await Timetable.findAll({
      where: { dayOfWeek },
      order: [['startTime', 'ASC']]
    });
  }

  async findByRoom(room) {
    return await Timetable.findAll({
      where: { room },
      order: [['dayOfWeek', 'ASC'], ['startTime', 'ASC']]
    });
  }

  async create(data) {
    // Check for time conflicts
    await this.checkTimeConflict(data);
    return await Timetable.create(data);
  }

  async bulkCreate(entries) {
    // Check for time conflicts for each entry
    for (const entry of entries) {
      await this.checkTimeConflict(entry);
    }
    return await Timetable.bulkCreate(entries);
  }

  async update(id, data) {
    const timetable = await this.findById(id);
    // Check for time conflicts, excluding the current entry
    await this.checkTimeConflict(data, id);
    await timetable.update(data);
    return timetable;
  }

  async delete(id) {
    const timetable = await this.findById(id);
    await timetable.destroy();
    return true;
  }

  async checkRoomAvailability(room, date, startTime, endTime) {
    const dayOfWeek = new Date(date).toLocaleString('en-US', { weekday: 'long' });
    
    const conflicts = await Timetable.findAll({
      where: {
        room,
        dayOfWeek,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [startTime, endTime]
            }
          },
          {
            endTime: {
              [Op.between]: [startTime, endTime]
            }
          }
        ]
      }
    });

    return {
      available: conflicts.length === 0,
      conflicts
    };
  }

  async checkTimeConflict(data, excludeId = null) {
    const conflicts = await Timetable.findAll({
      where: {
        id: { [Op.ne]: excludeId },
        room: data.room,
        dayOfWeek: data.dayOfWeek,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [data.startTime, data.endTime]
            }
          },
          {
            endTime: {
              [Op.between]: [data.startTime, data.endTime]
            }
          }
        ]
      }
    });

    if (conflicts.length > 0) {
      throw new Error('Time slot conflict detected');
    }
  }
}

module.exports = new TimetableService(); 