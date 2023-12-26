const userService = require('../services/userService');
const ErrorHandler = require('../errors/ErrorHandler');
const { validationResult } = require('express-validator');

class UserController {
  async create(req, res, next) {
    try {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(ErrorHandler.badRequest('PASSWORD_VALIDATION_FAILED'));
      }
      const { username, password, role } = req.body;
      const userData = await userService.create(username, password, role);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const userData = await userService.login(username, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async edit(req, res, next) {
    try {
      const id = req.params.id;
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(ErrorHandler.badRequest('PASSWORD_VALIDATION_FAILED'));
      }
      const userData = await userService.edit(id, req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new UserController();
