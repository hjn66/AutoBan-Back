const CarService = require("../startup/sequelize").CarService;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getServiceById = async function(id) {
  service = await CarService.findByPk(id);
  if (!service) {
    throw new Error("Car Service not found");
  }
  return service;
};

module.exports.addCarService = async function(persianName, englishName) {
  return await CarService.create({
    persianName: persianName,
    englishName: englishName
  });
};

module.exports.updateCarService = async function(CarService) {
  return await CarService.save();
};

module.exports.listCarService = async function() {
  return await CarService.findAll();
};
