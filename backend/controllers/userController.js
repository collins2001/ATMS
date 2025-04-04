const userService = require('../services/userService');

exports.getUsers = async (req, res, next) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    
    const users = await userService.findAll({ search, role, limit, offset });
    
    res.json({
      users: users.rows,
      pagination: {
        total: users.count,
        page: parseInt(page),
        pages: Math.ceil(users.count / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await userService.findById(req.params.id);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: 'User not found' });
    } else {
      next(error);
    }
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      next(error);
    }
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: 'User not found' });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      next(error);
    }
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error.message === 'User not found') {
      res.status(404).json({ error: 'User not found' });
    } else {
      next(error);
    }
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json(user);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      next(error);
    }
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Both old and new passwords are required' });
    }

    await userService.changePassword(req.user.id, oldPassword, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    if (error.message === 'Invalid current password') {
      res.status(400).json({ error: 'Current password is incorrect' });
    } else {
      next(error);
    }
  }
}; 