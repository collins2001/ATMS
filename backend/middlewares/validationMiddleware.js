const { schemas } = require('../utils/validators');

exports.validateRequest = (schemaName) => {
  return (req, res, next) => {
    try {
      const schema = schemas[schemaName];
      if (!schema) {
        throw new Error(`Validation schema '${schemaName}' not found`);
      }

      const errors = [];
      Object.keys(schema).forEach(field => {
        const value = req.body[field];
        const rules = schema[field];

        // Check required fields
        if (rules.required && !value) {
          errors.push(`${field} is required`);
          return;
        }

        // Check type
        if (value && rules.type && typeof value !== rules.type) {
          errors.push(`${field} must be of type ${rules.type}`);
        }

        // Run custom validation if exists
        if (value && rules.validate && !rules.validate(value)) {
          errors.push(`${field} is invalid`);
        }
      });

      if (errors.length > 0) {
        return res.status(400).json({ errors });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}; 