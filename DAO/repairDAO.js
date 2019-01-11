const Repair = require("../startup/sequelize").Repair;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addRepair = async function(title, date, totalCost, garageName, garageId, creatorId, carId) {
  return await Repair.create({ title, date, totalCost, garageName, garageId, creatorId, carId });
};

module.exports.removeRepair = async function(repair) {
  return await repair.destroy();
};
