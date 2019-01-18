const Part = require("../startup/sequelize").Part;
const PartCategory = require("../startup/sequelize").PartCategory;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addPartCategory = async function(persianName, englishName) {
  return await PartCategory.create({ persianName: persianName, englishName: englishName });
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
