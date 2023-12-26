const beneficiaryService = require('../services/beneficiaryService');

class BeneficiaryController {
  async create(req, res, next) {
    try {
      const beneficiaryData = req.body;
      const beneficiary = await beneficiaryService.create(beneficiaryData);
      return res.json(beneficiary);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const beneficiaries = await beneficiaryService.getAll(req.query);
      return res.json(beneficiaries);
    } catch (error) {
      next(error);
    }
  }

  async visit(req, res, next) {
    try {
      const beneficiary = await beneficiaryService.addVisits(req.body);
      return res.json(beneficiary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeneficiaryController();
