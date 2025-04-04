import api from './api';

export const assignmentService = {
  async getAssignments() {
    return api.get('/assignments');
  },

  async getAssignment(id) {
    return api.get(`/assignments/${id}`);
  },

  async createAssignment(assignmentData) {
    return api.post('/assignments', assignmentData);
  },

  async updateAssignment(id, assignmentData) {
    return api.put(`/assignments/${id}`, assignmentData);
  },

  async deleteAssignment(id) {
    return api.delete(`/assignments/${id}`);
  },

  async submitAssignment(id, submissionData) {
    return api.post(`/assignments/${id}/submit`, submissionData);
  },

  async getSubmissions(id) {
    return api.get(`/assignments/${id}/submissions`);
  }
}; 