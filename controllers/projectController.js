const projectService = require('../services/projectService');
class ProjectController {
  async create(req, res, next) {
    try {
      const { name, startDate, endDate, users } = req.body;
      const project = await projectService.create(
        name,
        startDate,
        endDate,
        users
      );
      return res.json(project);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectService.getAll();
      return res.json(projects);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
