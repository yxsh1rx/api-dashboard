const Project = require('../models/projectModel');
const ErrorHandler = require('../errors/ErrorHandler');

class ProjectService {
  async create(data) {
    const candidate = await Project.findOne({ name: data.name });
    if (candidate) {
      throw ErrorHandler.badRequest('PROJECT_EXISTS');
    } else if (data.start >= data.end) {
      throw ErrorHandler.badRequest('INVALID_DATE');
    } else {
      const project = await Project.create({
        name: data.name,
        start: data.start,
        end: data.end,
        users: data.users
      });
      return {
        ...project._doc
      };
    }
  }

  async getAll(query) {
    const projects = await Project.find(query);
    if (projects.length === 0) {
      throw ErrorHandler.badRequest('PROJECTS_NOT_FOUND');
    }
    return projects;
  }
}

module.exports = new ProjectService();
