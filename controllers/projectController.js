const projectService = require('../services/projectService');
class ProjectController {
  async create(req, res, next) {
    try {
      const project = await projectService.create(req.body);
      return res.json(project);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const projects = await projectService.getAll(req.query);
      return res.json(projects);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
