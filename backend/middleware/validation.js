/**
 * Middleware to validate request data against a schema
 * @param {string} schemaName - Name of the schema to validate against
 */
const validateRequest = (schemaName) => {
  return (req, res, next) => {
    try {
      // Get the schema based on the schema name
      const schema = getSchema(schemaName);
      
      if (!schema) {
        return res.status(500).json({ error: `Schema '${schemaName}' not found.` });
      }

      // Validate request body against schema
      const { error } = schema.validate(req.body);
      
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      next();
    } catch (error) {
      console.error('Validation middleware error:', error);
      res.status(500).json({ error: 'Internal server error during validation.' });
    }
  };
};

/**
 * Get the validation schema by name
 * @param {string} schemaName - Name of the schema to retrieve
 * @returns {Object} - The validation schema
 */
const getSchema = (schemaName) => {
  // Import Joi for validation
  const Joi = require('joi');
  
  // Define schemas
  const schemas = {
    assignment: Joi.object({
      title: Joi.string().required().min(3).max(100),
      description: Joi.string().allow('').max(1000),
      course: Joi.string().required().min(2).max(20),
      dueDate: Joi.date().required().greater('now'),
      fileUrl: Joi.string().allow('').uri().max(255)
    }),
    
    timetable: Joi.object({
      courseId: Joi.string().required().min(2).max(20),
      dayOfWeek: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
      startTime: Joi.string().required().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      endTime: Joi.string().required().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
      room: Joi.string().required().min(1).max(20)
    }),
    
    timetableBulk: Joi.array().items(
      Joi.object({
        courseId: Joi.string().required().min(2).max(20),
        dayOfWeek: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday').required(),
        startTime: Joi.string().required().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        endTime: Joi.string().required().pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
        room: Joi.string().required().min(1).max(20)
      })
    )
  };
  
  return schemas[schemaName];
};

module.exports = {
  validateRequest
}; 