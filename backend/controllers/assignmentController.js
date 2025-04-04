const assignmentService = require('../services/assignmentService');

exports.createAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.create(req.body);
    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
};

exports.getAssignments = async (req, res, next) => {
  try {
    const { course } = req.query;
    const assignments = await assignmentService.findAll({ course });
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

exports.getAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    next(error);
  }
};

exports.updateAssignment = async (req, res, next) => {
  try {
    const assignment = await assignmentService.update(req.params.id, req.body);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    next(error);
  }
};

exports.deleteAssignment = async (req, res, next) => {
  try {
    const deleted = await assignmentService.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getUpcomingAssignments = async (req, res, next) => {
  try {
    const { course } = req.query;
    const assignments = await assignmentService.findUpcoming(course);
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

exports.getAssignmentsByCourse = async (req, res, next) => {
  try {
    const assignments = await assignmentService.findByCourse(req.params.course);
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

exports.submitAssignment = async (req, res, next) => {
  try {
    const submission = await assignmentService.submitAssignment(
      req.params.id,
      req.user.id,
      req.body
    );
    res.status(201).json(submission);
  } catch (error) {
    if (error.message === 'Assignment not found') {
      res.status(404).json({ error: 'Assignment not found' });
    } else if (error.message === 'Assignment deadline has passed') {
      res.status(400).json({ error: 'Assignment deadline has passed' });
    } else {
      next(error);
    }
  }
}; 