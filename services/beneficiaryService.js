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

  async edit(id, data) {
    const beneficiary = await Beneficiary.findById(id);
    if (!beneficiary) {
      throw ErrorHandler.badRequest('BENEFICIARY_NOT_FOUND');
    } else {
      beneficiary.fullName = data.fullName || beneficiary.fullName;
      beneficiary.sex = data.sex || beneficiary.sex;
      beneficiary.dob = data.dob || beneficiary.dob;
      beneficiary.location = data.location || beneficiary.location;
      beneficiary.phone = data.phone || beneficiary.phone;
      beneficiary.disability = data.disability || beneficiary.disability;
      beneficiary.disaggregation =
        data.disaggregation || beneficiary.disaggregation;

      await beneficiary.save();

      return beneficiary;
    }
  }

  async getAll(query) {
    const beneficiaries = await Beneficiary.find(query);
    return beneficiaries;
  }

  async support(_id, data) {
    const beneficiary = await Beneficiary.findById(_id);
    const support = beneficiary.support.find((item) => item.name === data.name);
    if (support) {
      support.dates = data.dates;
    } else {
      beneficiary.support.push(data);
    }

    const response = await Beneficiary.updateOne(
      { _id },
      { $set: { support: beneficiary.support } }
    );
    return response;
  }
}

module.exports = new BeneficiaryService();
