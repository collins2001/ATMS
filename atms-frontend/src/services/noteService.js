import api from './api';

export const noteService = {
  async getNotes() {
    return api.get('/notes');
  },

  async getNote(id) {
    return api.get(`/notes/${id}`);
  },

  async createNote(noteData) {
    return api.post('/notes', noteData);
  },

  async updateNote(id, noteData) {
    return api.put(`/notes/${id}`, noteData);
  },

  async deleteNote(id) {
    return api.delete(`/notes/${id}`);
  },

  async shareNote(id, userData) {
    return api.post(`/notes/${id}/share`, userData);
  },

  async getSharedNotes() {
    return api.get('/notes/shared');
  }
}; 