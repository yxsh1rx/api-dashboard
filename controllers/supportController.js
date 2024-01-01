const supportService = require('../services/supportService');
class SupportController {
  async create(req, res, next) {
    try {
      const support = await supportService.create(
        req.body.name,
        req.body.project
      );
      return res.json(support);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const supportList = await supportService.getAll(req.query);
      return res.json(supportList);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SupportController();
