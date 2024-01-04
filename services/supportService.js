const ErrorHandler = require('../errors/ErrorHandler');
const Support = require('../models/supportModel');

class SupportService {
  async create(name, permissions, project) {
    const candidate = await Support.findOne({ name });
    if (candidate) {
      throw ErrorHandler.badRequest('SUPPORT_EXISTS');
    } else {
      const support = await Support.create({
        name,
        permissions,
        project
      });
      return {
        ...support._doc
      };
    }
  }

  async getAll(query) {
    const supportList = await Support.find(query);
    if (supportList.length === 0) {
      throw ErrorHandler.badRequest('SUPPORT_NOT_FOUND');
    }
    return supportList;
  }
}

module.exports = new SupportService();
