const noteService = require('../services/noteService');

exports.createNote = async (req, res, next) => {
  try {
    const note = await noteService.create(req.body);
    res.status(201).json(note);
  } catch (error) {
    next(error);
  }
};

exports.getNotes = async (req, res, next) => {
  try {
    const { course } = req.query;
    const notes = await noteService.findAll(course);
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

exports.getNote = async (req, res, next) => {
  try {
    const note = await noteService.findById(req.params.id);
    res.json(note);
  } catch (error) {
    if (error.message === 'Note not found') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      next(error);
    }
  }
};

exports.updateNote = async (req, res, next) => {
  try {
    const note = await noteService.update(req.params.id, req.body);
    res.json(note);
  } catch (error) {
    if (error.message === 'Note not found') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      next(error);
    }
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const result = await noteService.delete(req.params.id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Note not found') {
      res.status(404).json({ error: 'Note not found' });
    } else {
      next(error);
    }
  }
}; 