const CarService = rootRequire("startup/sequelize").CarService;
const bcrypt = require("bcryptjs");
const Utils = rootRequire("middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getById = async function(id) {
  service = await CarService.findByPk(id);
  if (!service) {
    throw new Error("Car Service not found");
  }
  return service;
};

module.exports.getByName = async function(persianName) {
  return await CarService.findOne({ where: { persianName } });
};

module.exports.add = async function(persianName, englishName) {
  return await CarService.create({
    persianName: persianName,
    englishName: englishName
  });
};

module.exports.update = async function(carService) {
  return await carService.save();
};

module.exports.remove = async function(carService) {
  return await carService.destroy();
};

module.exports.list = async function() {
  return await CarService.findAll();
};
