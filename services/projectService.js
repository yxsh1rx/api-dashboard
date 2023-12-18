const Project = require('../models/projectModel');
const ErrorHandler = require('../errors/ErrorHandler');

class ProjectService {
  async create(name, startDate, endDate, users) {
    const candidate = await Project.findOne({ name });
    if (candidate) {
      throw ErrorHandler.badRequest('PROJECT_EXISTS');
    } else if (startDate >= endDate) {
      throw ErrorHandler.badRequest('INVALID_DATE');
    } else {
      const project = await Project.create({
        name,
        startDate,
        endDate,
        users
      });
      return {
        ...project
      };
    }
  }
  async getAll(userId = null) {
    if (userId) {
      const projects = await Project.find({ users: userId });
      return projects;
    } else {
      const projects = await Project.find();
      return projects;
    }
  }

  async getById(projectId, userId) {
    const project = await Project.findById(projectId).where({ user: userId });
    return project;
  }
}

module.exports = new ProjectService();
