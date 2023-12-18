const beneficiaryService = require('../services/beneficiaryService');

class BeneficiaryController {
  async create(req, res, next) {
    try {
      const {
        fullName,
        sex,
        dob,
        location,
        phone,
        disability,
        displacement,
        user,
        projects
      } = req.body;
      const beneficiary = await beneficiaryService.create(
        fullName,
        sex,
        dob,
        location,
        phone,
        disability,
        displacement,
        user,
        projects
      );
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
}

module.exports = new BeneficiaryController();
