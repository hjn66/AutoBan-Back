const CarService = require('../startup/sequelize').CarService;
const bcrypt = require('bcryptjs');
const Utils = require('../middlewares/utils');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.addCarService = async function(persianName, englishName) {
  return await CarService.create({
    persianName: persianName,
    englishName: englishName
  });
};

module.exports.listCarService = async function() {
  return await CarService.findAll();
};
