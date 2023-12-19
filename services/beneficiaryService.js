const Beneficiary = require('../models/beneficiaryModel');
const ErrorHandler = require('../errors/ErrorHandler');

class BeneficiaryService {
  async create(beneficiaryData) {
    const candidate = await Beneficiary.findOne({
      fullName: beneficiaryData.fullName,
      dob: beneficiaryData.dob
    });
    if (candidate) {
      throw ErrorHandler.badRequest('BENEFICIARY_EXISTS');
    } else {
      const beneficiary = await Beneficiary.create({
        fullName: beneficiaryData.fullName,
        sex: beneficiaryData.sex,
        dob: beneficiaryData.dob,
        location: beneficiaryData.location,
        phone: beneficiaryData.phone,
        disability: beneficiaryData.disability,
        displacement: beneficiaryData.displacement,
        user: beneficiaryData.user,
        projects: beneficiaryData.projects
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
