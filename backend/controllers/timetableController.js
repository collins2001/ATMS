const timetableService = require('../services/timetableService');

exports.getTimetables = async (req, res, next) => {
  try {
    const { courseId, dayOfWeek, room } = req.query;
    const timetables = await timetableService.findAll({ 
      courseId, 
      dayOfWeek, 
      room
    });
    res.json(timetables);
  } catch (error) {
    next(error);
  }
};

exports.getTimetableById = async (req, res, next) => {
  try {
    const timetable = await timetableService.findById(req.params.id);
    res.json(timetable);
  } catch (error) {
    if (error.message === 'Timetable entry not found') {
      res.status(404).json({ error: 'Timetable entry not found' });
    } else {
      next(error);
    }
  }
};

exports.getTimetablesByCourse = async (req, res, next) => {
  try {
    const timetables = await timetableService.findByCourse(req.params.courseId);
    res.json(timetables);
  } catch (error) {
    next(error);
  }
};

exports.getTimetablesByDay = async (req, res, next) => {
  try {
    const timetables = await timetableService.findByDay(req.params.dayOfWeek);
    res.json(timetables);
  } catch (error) {
    next(error);
  }
};

exports.getTimetablesByRoom = async (req, res, next) => {
  try {
    const timetables = await timetableService.findByRoom(req.params.room);
    res.json(timetables);
  } catch (error) {
    next(error);
  }
};

exports.createTimetable = async (req, res, next) => {
  try {
    const timetable = await timetableService.create(req.body);
    res.status(201).json(timetable);
  } catch (error) {
    if (error.message === 'Time slot conflict detected') {
      res.status(400).json({ error: 'Time slot conflict detected' });
    } else {
      next(error);
    }
  }
};

exports.bulkCreateTimetables = async (req, res, next) => {
  try {
    const timetables = await timetableService.bulkCreate(req.body.entries);
    res.status(201).json(timetables);
  } catch (error) {
    if (error.message === 'Time slot conflict detected') {
      res.status(400).json({ error: 'Time slot conflict detected' });
    } else {
      next(error);
    }
  }
};

exports.updateTimetable = async (req, res, next) => {
  try {
    const timetable = await timetableService.update(req.params.id, req.body);
    res.json(timetable);
  } catch (error) {
    if (error.message === 'Timetable entry not found') {
      res.status(404).json({ error: 'Timetable entry not found' });
    } else if (error.message === 'Time slot conflict detected') {
      res.status(400).json({ error: 'Time slot conflict detected' });
    } else {
      next(error);
    }
  }
};

exports.deleteTimetable = async (req, res, next) => {
  try {
    await timetableService.delete(req.params.id);
    res.json({ message: 'Timetable entry deleted successfully' });
  } catch (error) {
    if (error.message === 'Timetable entry not found') {
      res.status(404).json({ error: 'Timetable entry not found' });
    } else {
      next(error);
    }
  }
};

exports.checkRoomAvailability = async (req, res, next) => {
  try {
    const { room } = req.params;
    const { date, startTime, endTime } = req.query;
    
    if (!date || !startTime || !endTime) {
      return res.status(400).json({ 
        error: 'Date, start time, and end time are required' 
      });
    }

    const availability = await timetableService.checkRoomAvailability(
      room, 
      date, 
      startTime, 
      endTime
    );
    
    res.json(availability);
  } catch (error) {
    next(error);
  }
}; 