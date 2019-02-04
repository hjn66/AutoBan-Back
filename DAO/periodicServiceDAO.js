const config = require('config');
const PeriodicService = require('../startup/sequelize').PeriodicService;
const Cost = require('../startup/sequelize').Cost;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports.addPeriodicServiceItems = async function(
  repairId,
  serviceItems
) {
  for (const index in serviceItems) {
    serviceItems[index].repairId = repairId;
    serviceItems[index].categoryId = id;
    await PeriodicService.create(serviceItems[index]);
  }
};
