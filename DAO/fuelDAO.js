const config = require("config");
const Fuel = require("../startup/sequelize").Fuel;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getFuelById = async function(id) {
  var fuel = await Fuel.findByPk(id);
  if (!fuel) {
    throw new Error("Fuel not found");
  }
  return fuel;
};

module.exports.getFuelByCostId = async function(costId) {
  var fuel = await Fuel.find({ where: { costId: costId } });
  if (!fuel) {
    throw new Error("Fuel not found");
  }
  return fuel;
};

module.exports.addFuel = async function(volume, type, odometer, isFull, stationName, costId) {
  return await Fuel.create({
    costId: costId,
    volume: volume,
    type: type,
    odometer: odometer,
    isFull: isFull,
    stationName: stationName
  });
};

module.exports.updateFuel = async function(fuel) {
  return await fuel.save();
};

module.exports.removeFuel = async function(fuel) {
  return await fuel.destroy();
};

module.exports.listCostByCar = async function(carId) {
  return await Cost.findAll({ where: { carId: carId }, order: [["date"]] });
};
