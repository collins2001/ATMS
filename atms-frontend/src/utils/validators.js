export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value !== '';
};

export const validateLength = (value, min, max) => {
  if (!value) return false;
  const length = value.toString().length;
  return length >= min && length <= max;
};

export const validateDate = (date) => {
  const d = new Date(date);
  return d instanceof Date && !isNaN(d);
};

export const validateTime = (time) => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

export const validateFileSize = (file, maxSizeMB = 5) => {
  return file.size <= maxSizeMB * 1024 * 1024;
};

export const validateFileType = (file, allowedTypes) => {
  return allowedTypes.includes(file.type);
};

export const validateForm = (values, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = values[field];
    const fieldRules = rules[field];

    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = 'This field is required';
    } else if (value) {
      if (fieldRules.email && !validateEmail(value)) {
        errors[field] = 'Invalid email address';
      }
      if (fieldRules.password && !validatePassword(value)) {
        errors[field] = 'Password must be at least 6 characters long';
      }
      if (fieldRules.minLength && !validateLength(value, fieldRules.minLength)) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      }
      if (fieldRules.maxLength && !validateLength(value, 0, fieldRules.maxLength)) {
        errors[field] = `Must be no more than ${fieldRules.maxLength} characters`;
      }
      if (fieldRules.date && !validateDate(value)) {
        errors[field] = 'Invalid date';
      }
      if (fieldRules.time && !validateTime(value)) {
        errors[field] = 'Invalid time format (HH:MM)';
      }
      if (fieldRules.custom && !fieldRules.custom(value)) {
        errors[field] = fieldRules.message || 'Invalid value';
      }
    }
  });

  return errors;
}; 