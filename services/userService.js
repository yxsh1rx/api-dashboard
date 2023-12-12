const User = require('../models/userModel');
const tokenService = require('./tokenService');
const UserDTO = require('../dtos/userDTO');
const ErrorHandler = require('../errors/errorHandler');
const bcrypt = require('bcrypt');

class UserService {
  async create(username, password, role) {
    const candidate = await User.findOne({ username });
    if (candidate) {
      throw ErrorHandler.badRequest('USER_EXISTS');
    } else {
      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.create({
        username,
        password: hashPassword,
        role
      });
      const userDTO = new UserDTO(user);
      const tokens = tokenService.generate({ ...userDTO });
      await tokenService.save(userDTO.id, tokens.refreshToken);

      return {
        ...tokens,
        user: userDTO
      };
    }
  }

  async login(username, password) {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('error handled');
      throw ErrorHandler.badRequest('INVALID_USERNAME');
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);
    if (!isPasswordEquals) {
      throw ErrorHandler.badRequest('INVALID_PASSWORD');
    }
    if (user.status === 'Deleted') {
      throw ErrorHandler.badRequest('USER_IS_NOT_ACTIVE');
    }
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generate({ ...userDTO });
    await tokenService.save(userDTO.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDTO
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.remove(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ErrorHandler.badRequest('MISSING_REFRESH_TOKEN');
    }
    const userData = tokenService.validateRefresh(refreshToken);
    const tokenFromDB = await tokenService.find(refreshToken);

    if (!userData) {
      throw ErrorHandler.badRequest('REFRESH_TOKEN_EXPIRED');
    }
    if (!tokenFromDB) {
      throw ErrorHandler.badRequest('REFRESH_TOKEN_NOT_FOUND');
    }
    const user = await User.findById(userData.id);
    const userDTO = new UserDTO(user);
    const tokens = tokenService.generate({ ...userDTO });
    await tokenService.save(userDTO.id, tokens.refreshToken);
    return { ...tokens, user: userDTO };
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async edit(userId, fullName, username, password, role) {
    const candidate = await User.findOne({ username });
    if (candidate) {
      throw ErrorHandler.badRequest('USER_EXISTS');
    } else {
      const editedUser = await User.findById(userId);
      if (!editedUser) {
        throw ErrorHandler.badRequest('USER_NOT_FOUND');
      } else {
        const hashPassword = await bcrypt.hash(password, 3);
        editedUser.fullName = fullName || editedUser.fullName;
        editedUser.username = username || editedUser.username;
        editedUser.password = hashPassword || editedUser.password;
        editedUser.role = role || editedUser.role;

        await editedUser.save();

        const userDTO = new UserDTO(editedUser);
        const tokens = tokenService.generate({ ...userDTO });
        await tokenService.save(userDTO.id, tokens.refreshToken);

        return {
          ...tokens,
          editedUser: userDTO
        };
      }
    }
  }
}

module.exports = new UserService();
