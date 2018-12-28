const config = require("config");
const Cost = require("../startup/sequelize").Cost;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getCostById = async function(id) {
  var cost = await Cost.findByPk(id);
  if (!cost) {
    throw new Error("Cost not found");
  }
  return cost;
};

module.exports.addCost = async function(type, date, value, comment, carId) {
  return await Cost.create({
    carId: carId,
    type: type,
    date: date,
    value: value,
    comment: comment
  });
};

module.exports.updateCost = async function(cost) {
  return await cost.save();
};

module.exports.removeCost = async function(cost) {
  return await cost.destroy();
};

module.exports.listCostByCar = async function(carId, from, to) {
  if (!from) {
    from = "1900-01-01";
  }
  if (!to) {
    to = "2100-01-01";
  }
  return await Cost.findAll({ where: { carId: carId, date: { [Op.gte]: from, [Op.lte]: to } }, order: [["date"]] });
};

module.exports.listCategorizedCostByCar = async function(carId) {
  if (!from) {
    from = "1900-01-01";
  }
  if (!to) {
    to = "2100-01-01";
  }
  return await Cost.findAll({
    where: { carId: carId, date: { [Op.gte]: from, [Op.lte]: to } },
    group: ["type"],
    attributes: ["type", [Sequelize.fn("SUM", Sequelize.col("value")), "totalCost"]]
  });
};
