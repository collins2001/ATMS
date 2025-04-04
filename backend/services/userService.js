const User = require('../models/User');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');

class UserService {
  async create(userData) {
    // Hash password if provided
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    // Create new user
    const user = await User.create(userData);
    
    // Return user data without password
    const { password, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async findAll(query = {}) {
    const { search, role, limit = 10, offset = 0 } = query;
    
    // Build where clause
    const where = {};
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (role) {
      where.role = role;
    }

    return User.findAndCountAll({
      where,
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
  }

  async findById(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  }

  async findByEmail(email) {
    return User.findOne({
      where: { email },
      attributes: { exclude: ['password'] }
    });
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Hash password if it's being updated
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    await user.update(userData);
    
    // Return updated user without password
    const { password, ...updatedUser } = user.toJSON();
    return updatedUser;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
    return { message: 'User deleted successfully' };
  }

  async validateUser(email, password) {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword;
  }

  async changePassword(id, oldPassword, newPassword) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('User not found');
    }

    // Verify old password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid current password');
    }

    // Hash and update new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    return { message: 'Password updated successfully' };
  }

  async updateProfile(id, profileData) {
    const allowedUpdates = ['name', 'email'];
    const filteredData = Object.keys(profileData)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = profileData[key];
        return obj;
      }, {});

    const user = await this.update(id, filteredData);
    return user;
  }
}

module.exports = new UserService(); 