const config = require("config");
const PeriodicService = rootRequire("startup/sequelize").PeriodicService;
const PartCategory = rootRequire("startup/sequelize").PartCategory;
const Part = rootRequire("startup/sequelize").Part;

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

module.exports.getByRepairId = async function(repairId) {
  return await PeriodicService.findAll({
    where: { repairId },
    include: [PartCategory, Part]
  });
};
