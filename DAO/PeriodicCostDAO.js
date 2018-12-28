const config = require("config");
const PeriodicCost = require("../startup/sequelize").PeriodicCost;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getPeriodicCostById = async function(id) {
  var periodicCost = await PeriodicCost.findOne({ where: { id: id } });
  if (!periodicCost) {
    throw new Error("PeriodicCost not found");
  }
  return periodicCost;
};

module.exports.getPeriodicCostByCostId = async function(costId) {
  var periodicCost = await PeriodicCost.findOne({ where: { costId: costId } });
  if (!periodicCost) {
    throw new Error("PeriodicCost not found");
  }
  return periodicCost;
};

module.exports.addPeriodicCost = async function(type, period, costId) {
  return await PeriodicCost.create({
    costId: costId,
    type: type,
    period: period
  });
};

module.exports.updatePeriodicCost = async function(periodicCost) {
  return await periodicCost.save();
};

module.exports.removePeriodicCost = async function(periodicCost) {
  return await periodicCost.destroy();
};
