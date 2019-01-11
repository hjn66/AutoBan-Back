const Receipt = require("../startup/sequelize").Receipt;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getReceiptById = async function(id) {
  var receipt = await Receipt.findByPk(id);
  if (!receipt) {
    throw new Error("Receipt not found");
  }
  return receipt;
};

module.exports.addReceipt = async function(title, date, totalCost, shopName, image, repairId) {
  return await Receipt.create({ title, date, totalCost, shopName, image, repairId });
};

module.exports.removeReceipt = async function(receipt) {
  return await receipt.destroy();
};

module.exports.updateRepairCost = async function(repair) {
  result = await Receipt.findAll({
    where: { repairId: repair.id },
    attributes: [[Sequelize.fn("SUM", Sequelize.col("totalCost")), "totalCosts"]]
  });
  repair.totalCost = result[0].dataValues.totalCosts;
  return await repair.save();
};
