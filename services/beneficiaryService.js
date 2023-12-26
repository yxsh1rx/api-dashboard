const Beneficiary = require('../models/beneficiaryModel');
const ErrorHandler = require('../errors/ErrorHandler');

class BeneficiaryService {
  async create(data) {
    const candidate = await Beneficiary.findOne({
      fullName: data.fullName,
      dob: data.dob
    });
    if (candidate) {
      throw ErrorHandler.badRequest('BENEFICIARY_EXISTS');
    } else {
      const beneficiary = await Beneficiary.create({
        fullName: data.fullName,
        sex: data.sex,
        dob: data.dob,
        location: data.location,
        phone: data.phone,
        disability: data.disability,
        displacement: data.displacement,
        user: data.user,
        projects: data.projects
      });
      return {
        ...beneficiary
      };
    }
  }

  async getAll(query) {
    const beneficiaries = await Beneficiary.find(query);
    return beneficiaries;
  }

  async visit(data) {
    const beneficiary = await Beneficiary.findById(data.id);
    beneficiary.visits = data.visits;
    await beneficiary.save();
  }
}

module.exports = new BeneficiaryService();
