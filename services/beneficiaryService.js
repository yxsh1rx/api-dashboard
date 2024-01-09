const Beneficiary = require('../models/beneficiaryModel');
const ErrorHandler = require('../errors/ErrorHandler');

class BeneficiaryService {
  async create(data) {
    // Проверяем на наличие Бенефициара с таким именем и датой рождения
    const candidate = await Beneficiary.findOne({
      name: data.name,
      birthdate: data.birthdate
    });
    // Если Бенефициар найден - проверяем находится ли среди его проектов хотя бы один, который принадлежит текущему кандидату
    if (candidate) {
      if (candidate.projects.includes(data.projects[0])) {
        // Если такой проект уже есть - пробрасываем ошибку о дубликате
        throw ErrorHandler.badRequest('BENEFICIARY_EXISTS');
      } else {
        // Если такого проекта нет - редактируем Бенефициара, добавляя ему проект
        candidate.projects.push(data.projects[0]);
        await candidate.save();
      }
    } else {
      // Если Бенефициар не найден - создаем
      const beneficiary = await Beneficiary.create(data);
      return {
        ...beneficiary._doc
      };
    }
  }

  async edit(_id, data) {
    // Получаем редактируемого Кандидата по его _id
    const candidate = await Beneficiary.findById(_id);
    if (!candidate) {
      // Если Кандидат не найден - пробрасываем ошибку
      throw ErrorHandler.badRequest('BENEFICIARY_NOT_FOUND');
    }
    // Если Кандидат существует - меняем ему только те поля, которые переданы в функцию
    candidate.name.first = data.name.first ?? candidate.name.first;
    candidate.name.last = data.name.last ?? candidate.name.last;
    candidate.sex = data.sex ?? candidate.sex;
    candidate.birthdate = data.birthdate ?? candidate.birthdate;
    candidate.location = data.location ?? candidate.location;
    candidate.phone = data.phone ?? candidate.phone;
    candidate.disability = data.disability ?? candidate.disability;
    candidate.disaggregation = data.disaggregation ?? candidate.disaggregation;
    // Ищем, есть ли системе Бенефициар с именем и датой рождения, которые мы хотим присвоить
    const beneficiary = await Beneficiary.findOne({
      name: data.name,
      birthdate: data.birthdate
    });
    // Если нет - пропускаем Кандидата.
    if (!beneficiary) {
      await candidate.save();
      return candidate;
    }
    // Если есть - проверяем, а не наш ли это Кандидат собственной персоной (по _id). Если он - пропускаем
    else if (beneficiary._id.toString() === _id) {
      await candidate.save();
      return candidate;
    }
    // Если нет - прокидываем ошибку
    else {
      throw ErrorHandler.badRequest('DUPLICATE_BENEFICIARY');
    }
  }

  async getAll(query) {
    // Ищем всех Бенефициаров, соответствующих фильтрам из запроса
    const beneficiaries = await Beneficiary.find(query);
    return beneficiaries;
  }

  async support(_id, data) {
    // Вытаскиваем Бенефициара с заданным UUID
    const beneficiary = await Beneficiary.findById(_id);
    // Ищем, оказывали ли ему такую поддержку
    const support = beneficiary.support.find((item) => item.name === data.name);
    // Если да - меняем даты на свежие
    if (support) {
      support.dates = data.dates;
    }
    // Если нет - добавляем оказанную поддержку к Бенефициару
    else {
      beneficiary.support.push(data);
    }
    // Тут использовал updateOne вместо save(), потому что почему-то некорректно работал метод
    const response = await Beneficiary.updateOne(
      { _id },
      { $set: { support: beneficiary.support } }
    );
    return response;
  }
}

module.exports = new BeneficiaryService();
