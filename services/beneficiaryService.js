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
      const beneficiary = await Beneficiary.create(data);
      return {
        ...beneficiary._doc
      };
    }
  }

  async getAll(query) {
    const beneficiaries = await Beneficiary.find(query);
    return beneficiaries;
  }

  async visit(data) {
    const beneficiary = await Beneficiary.findById(data._id);
    beneficiary.visits = data.visits;
    console.log(data);
    await beneficiary.save();
    return beneficiary;
  }
}

module.exports = new BeneficiaryService();
