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

  async edit(req, res, next) {
    try {
      const id = req.params.id;
      const beneficiaryData = await beneficiaryService.edit(id, req.body);
      return res.json(beneficiaryData);
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

  async support(req, res, next) {
    try {
      const beneficiary = await beneficiaryService.support(
        req.params.id,
        req.body
      );
      return res.json(beneficiary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeneficiaryController();
