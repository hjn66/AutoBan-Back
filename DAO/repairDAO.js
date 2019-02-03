const Repair = require("../startup/sequelize").Repair;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getRepairById = async function(id) {
  var repair = await Repair.findByPk(id);
  if (!repair) {
    throw new Error("Repair not found");
  }
  return repair;
};

module.exports.addRepair = async function(
  title,
  date,
  totalCost,
  garageName,
  garageId,
  creatorId,
  carId,
  isPeriodicService = false
) {
  return await Repair.create({
    title,
    date,
    totalCost,
    garageName,
    garageId,
    creatorId,
    carId,
    isPeriodicService
  });
};

module.exports.removeRepair = async function(repair) {
  return await repair.destroy();
};
