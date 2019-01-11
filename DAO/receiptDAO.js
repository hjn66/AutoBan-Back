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
