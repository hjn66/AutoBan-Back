const CarService = rootRequire("startup/sequelize").CarService;
const bcrypt = require("bcryptjs");
const Utils = rootRequire("middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getServiceById = async function(id) {
  service = await CarService.findByPk(id);
  if (!service) {
    throw new Error("Car Service not found");
  }
  return service;
};

module.exports.getServiceByName = async function(persianName) {
  return await CarService.findOne({ where: { persianName } });
};

module.exports.addCarService = async function(persianName, englishName) {
  return await CarService.create({
    persianName: persianName,
    englishName: englishName
  });
};

module.exports.updateCarService = async function(carService) {
  return await carService.save();
};

module.exports.removeCarService = async function(carService) {
  return await carService.destroy();
};

module.exports.listCarService = async function() {
  return await CarService.findAll();
};
