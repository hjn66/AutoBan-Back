const Receipt = require("../startup/sequelize").Receipt;
const ReceiptPart = require("../startup/sequelize").ReceiptPart;
const ReceiptService = require("../startup/sequelize").ReceiptService;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getById = async function(id) {
  let receipt = await Receipt.findByPk(id);
  if (!receipt) {
    throw new Error("Receipt not found");
  }
  return receipt;
};

module.exports.getByRepairId = async function(repairId) {
  let receipts = await Receipt.findAll({ where: { repairId } });
  return receipts;
};

module.exports.add = async function(
  title,
  date,
  totalCost,
  shopName,
  image,
  repairId
) {
  return await Receipt.create({
    title,
    date,
    totalCost,
    shopName,
    image,
    repairId
  });
};

module.exports.removeReceipt = async function(receipt) {
  return await receipt.destroy();
};

module.exports.updateRepairCost = async function(repair) {
  result = await Receipt.findAll({
    where: { repairId: repair.id },
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("totalCost")), "totalCosts"]
    ]
  });
  repair.totalCost = result[0].dataValues.totalCosts;
  return await repair.save();
};

module.exports.addItems = async function(receiptId, services, products) {
  for (const index in services) {
    services[index].receiptId = receiptId;
    await ReceiptService.create(services[index]);
  }
  for (const index in products) {
    products[index].receiptId = receiptId;
    if (products[index].partId) {
      await ReceiptPart.create(products[index]);
    }
  }
};

module.exports.updateReceiptCost = async function(receipt) {
  result = await ReceiptPart.findAll({
    where: { receiptId: receipt.id },
    attributes: [
      [Sequelize.fn("SUM", Sequelize.literal("cost * count")), "totalCosts"]
    ]
  });

  receipt.totalCost = result[0].dataValues.totalCosts;
  return await receipt.save();
};

module.exports.removeReceiptItems = async function(receiptId) {
  await ReceiptPart.destroy({ where: { receiptId } });
  await ReceiptService.destroy({ where: { receiptId } });
};
