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
      if (req.headers.role === ('Admin' || 'Moderator')) {
        const beneficiaries = await beneficiaryService.getAll(
          req.headers.project
        );
        return res.json(beneficiaries);
      } else {
        const beneficiaries = await beneficiaryService.getByUser(
          req.headers.user,
          req.headers.project
        );
        return res.json(beneficiaries);
      }
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const beneficiary = await beneficiaryService.getById(req.headers.id);
      return res.json(beneficiary);
    } catch (error) {
      next(error);
    }
  }

  async addVisits(req, res, next) {
    try {
      const beneficiary = await beneficiaryService.addVisits(req.body);
      return res.json(beneficiary);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeneficiaryController();
