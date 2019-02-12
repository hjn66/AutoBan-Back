const config = require("config");
const Fuel = rootRequire("startup/sequelize").Fuel;
const Cost = rootRequire("startup/sequelize").Cost;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getFuelById = async function(id) {
  var fuel = await Fuel.findByPk(id, { include: [Cost] });
  if (!fuel) {
    throw new Error("Fuel not found");
  }
  return fuel;
};

module.exports.getFuelByCostId = async function(costId) {
  var fuel = await Fuel.findOne({ where: { costId }, include: [Cost] });
  if (!fuel) {
    throw new Error("Fuel not found");
  }
  return fuel;
};

module.exports.addFuel = async function(
  volume,
  type,
  odometer,
  isFull,
  stationName,
  costId
) {
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

module.exports.listFuelByCar = async function(carId, from, to) {
  let query = {
    [Op.gte]: from || "1200-01-01",
    [Op.lte]: to || "2200-01-01"
  };

  return await Fuel.findAll({
    include: [{ model: Cost, where: { carId, date: query } }],
    order: [[Cost, "date", "DESC"]]
  });
};
