const Part = rootRequire("startup/sequelize").Part;
const PartCategory = rootRequire("startup/sequelize").PartCategory;
const bcrypt = require("bcryptjs");
const Utils = rootRequire("middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getPartCategoryById = async function(id) {
  category = await PartCategory.findByPk(id);
  if (!category) {
    throw new Error("Part category not found");
  }
  return category;
};

module.exports.addPartCategory = async function(persianName, englishName) {
  return await PartCategory.create({
    persianName: persianName,
    englishName: englishName
  });
};

module.exports.listPartCategory = async function() {
  return await PartCategory.findAll();
};

module.exports.updatePartCategory = async function(partCategory) {
  return await partCategory.save();
};

module.exports.removePartCategory = async function(partCategory) {
  return await partCategory.destroy();
};

module.exports.addPart = async function(part) {
  return await Part.create(part);
};

module.exports.updatePart = async function(part) {
  return await part.save();
};

module.exports.removePart = async function(part) {
  return await part.destroy();
};
module.exports.listPartByCategory = async function(categoryId) {
  return await Part.findAll({ where: { categoryId: categoryId } });
};

module.exports.getPeriodicServiceItems = async function() {
  return await PartCategory.findAll({ where: { checkPeriodic: true } });
};
