const Note = require('../models/Note');

class NoteService {
  async create(noteData) {
    return Note.create(noteData);
  }

  async findAll(course = null) {
    const where = {};
    if (course) {
      where.course = course;
    }
    return Note.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    const note = await Note.findByPk(id);
    if (!note) {
      throw new Error('Note not found');
    }
    return note;
  }

  async update(id, noteData) {
    const note = await this.findById(id);
    return note.update(noteData);
  }

  async delete(id) {
    const note = await this.findById(id);
    await note.destroy();
    return { message: 'Note deleted successfully' };
  }
}

module.exports = new NoteService(); 