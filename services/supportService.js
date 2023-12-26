const Support = require('../models/supportModel');
const ErrorHandler = require('../errors/ErrorHandler');

class SupportService {
  async create(data) {
    const support = await Support.findOne({
      name: data.name
    });
    if (support) {
      throw ErrorHandler.badRequest('SUPPORT_EXISTS');
    } else {
      const support = await Support.create({
        name: data.name,
        project: data.project
      });
      return {
        ...support
      };
    }
  }
}

module.exports = new SupportService();
