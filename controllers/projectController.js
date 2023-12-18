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
      if (req.headers.role === ('Admin' || 'Moderator')) {
        const projects = await projectService.getAll();
        return res.json(projects);
      }
      if (req.headers.role === 'User') {
        const projects = await projectService.getAll(req.headers.user);
        return res.json(projects);
      }
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const project = await projectService.getById(
        req.headers.project,
        req.headers.user
      );
      return res.json(project);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProjectController();
