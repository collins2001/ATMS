const { Op } = require('sequelize');
const Assignment = require('../models/Assignment');

class AssignmentService {
  async create(assignmentData) {
    return Assignment.create(assignmentData);
  }

  async findAll(filters = {}) {
    const { course } = filters;
    const where = {};
    
    if (course) {
      where.course = course;
    }

    return Assignment.findAll({
      where,
      order: [['dueDate', 'ASC']]
    });
  }

  async findById(id) {
    return Assignment.findByPk(id);
  }

  async update(id, assignmentData) {
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      throw new Error('Assignment not found');
    }
    return assignment.update(assignmentData);
  }

  async delete(id) {
    const assignment = await Assignment.findByPk(id);
    if (!assignment) {
      throw new Error('Assignment not found');
    }
    return assignment.destroy();
  }

  async findUpcoming(course = null) {
    const now = new Date();
    const where = {
      dueDate: {
        [Op.gt]: now
      }
    };

    if (course) {
      where.course = course;
    }

    return Assignment.findAll({
      where,
      order: [['dueDate', 'ASC']]
    });
  }

  async findByCourse(course) {
    return Assignment.findAll({
      where: { course },
      order: [['dueDate', 'ASC']]
    });
  }
}

module.exports = new AssignmentService(); 