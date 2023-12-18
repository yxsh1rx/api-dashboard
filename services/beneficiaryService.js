const Beneficiary = require('../models/beneficiaryModel');
const ErrorHandler = require('../errors/ErrorHandler');

class BeneficiaryService {
  async create(
    fullName,
    sex,
    dob,
    location,
    phone,
    disability,
    displacement,
    user,
    projects
  ) {
    const candidate = await Beneficiary.findOne({ fullName });
    if (candidate) {
      throw ErrorHandler.badRequest('BENEFICIARY_EXISTS');
    } else {
      const beneficiary = await Beneficiary.create({
        fullName,
        sex,
        dob,
        location,
        phone,
        disability,
        displacement,
        user,
        projects
      });
      return {
        ...beneficiary
      };
    }
  }

  async getAll(projectId) {
    const beneficiaries = await Beneficiary.find().where({
      projects: projectId
    });
    return beneficiaries;
  }

  async getByUser(userId, projectId) {
    const beneficiaries = await Beneficiary.find().where({
      user: userId,
      projects: projectId
    });
    return beneficiaries;
  }
}

module.exports = new BeneficiaryService();
