const jwt = require('jsonwebtoken');
const { ROLES } = require('../utils/constants');

/**
 * Middleware to authorize requests based on user roles
 * @param {Array} allowedRoles - Array of roles that are allowed to access the route
 */
const authorize = (allowedRoles = []) => {
  return (req, res, next) => {
    try {
      // Get token from header
      const token = req.header('Authorization')?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user has required role
      if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
      }

      // Add user info to request
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      res.status(401).json({ error: 'Invalid token or token expired.' });
    }
  };
};

module.exports = {
  authorize
}; 