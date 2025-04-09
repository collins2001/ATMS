/**
 * User roles in the system
 */
const ROLES = {
  ADMIN: 'admin',
  CLASS_REP: 'class_rep',
  STUDENT: 'student'
};

/**
 * Assignment statuses
 */
const ASSIGNMENT_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  LATE: 'late'
};

/**
 * Notification types
 */
const NOTIFICATION_TYPES = {
  ASSIGNMENT: 'assignment',
  ANNOUNCEMENT: 'announcement',
  TIMETABLE: 'timetable',
  SYSTEM: 'system'
};

module.exports = {
  ROLES,
  ASSIGNMENT_STATUS,
  NOTIFICATION_TYPES,
  STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500
  }
}; 