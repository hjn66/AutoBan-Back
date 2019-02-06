const config = require("config");
const PeriodicService = require("../startup/sequelize").PeriodicService;
const Cost = require("../startup/sequelize").Cost;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addItems = async function(repairId, serviceItems) {
  for (const index in serviceItems) {
    serviceItems[index].repairId = repairId;
    serviceItems[index].categoryId = id;
    await PeriodicService.create(serviceItems[index]);
  }
};

module.exports.removeItems = async function(repairId) {
  await PeriodicService.destroy({ where: { repairId } });
};

module.exports.list = async function(repairId) {
  PeriodicService.findAll({
    where: { repairId },
    include: [PartCategory, Part]
  });
};
