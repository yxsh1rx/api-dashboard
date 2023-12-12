const Project = require('../models/projectModel');
const ErrorHandler = require('../errors/ErrorHandler');

class ProjectService {
  async create(name, startDate, endDate, users) {
    const candidate = await Project.findOne({ name });
    if (candidate) {
      throw ErrorHandler.badRequest('PROJECT_EXISTS');
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
  async getAll() {
    const projects = await Project.find();
    return projects;
  }
}

module.exports = new ProjectService();
