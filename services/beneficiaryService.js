const Beneficiary = require('../models/beneficiaryModel');
const ErrorHandler = require('../errors/ErrorHandler');

class BeneficiaryService {
  async create(data) {
    // Проверяем на наличие бенефициара с таким именем и датой рождения в БД
    const candidate = await Beneficiary.findOne({
      name: data.name,
      birthdate: data.birthdate
    });
    // Если такой бенефициар найден, то проверяем находится ли среди его проектов хотя бы один, который принадлежит текущему кандидату
    if (candidate) {
      if (candidate.projects.includes(data.projects[0])) {
        // Если такой проект уже есть - пробрасываем ошибку о дубликате
        throw ErrorHandler.badRequest('BENEFICIARY_EXISTS');
      } else {
        // Если такого проекта нет - редактируем бенефициара и добавляем ему проект
      }
    } else {
      // Если бенефициар не найден, то создаём новую запись в БД
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
