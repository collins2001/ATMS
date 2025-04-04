const crypto = require('crypto');

exports.generateRandomString = (length = 32) => {
  return crypto.randomBytes(length).toString('hex');
};

exports.formatDate = (date) => {
  return new Date(date).toISOString();
};

exports.paginateResults = (data, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {
    data: data.slice(startIndex, endIndex),
    pagination: {
      total: data.length,
      page,
      pages: Math.ceil(data.length / limit)
    }
  };

  return results;
};

exports.sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
}; 