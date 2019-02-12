const config = require("config");
const Fine = rootRequire("startup/sequelize").Fine;
const FineCategory = rootRequire("startup/sequelize").FineCategory;
const Cost = rootRequire("startup/sequelize").Cost;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getFineById = async function(id) {
  var fine = await Fine.findByPk(id, { include: [FineCategory, Cost] });
  if (!fine) {
    throw new Error("Fine not found");
  }
  return fine;
};

module.exports.getFineByCostId = async function(costId) {
  var fine = await Fine.findOne({
    where: { costId },
    include: [FineCategory, Cost]
  });
  if (!fine) {
    throw new Error("Fine not found");
  }
  return fine;
};

module.exports.addFine = async function(fineCode, costId) {
  return await Fine.create({
    costId: costId,
    fineCategoryCode: fineCode
  });
};

module.exports.updateFine = async function(fine) {
  return await fine.save();
};

module.exports.removeFine = async function(fine) {
  return await fine.destroy();
};

module.exports.listFineByCar = async function(carId, from, to) {
  let query = {
    [Op.gte]: from || "1200-01-01",
    [Op.lte]: to || "2200-01-01"
  };

  return await Fine.findAll({
    include: [{ model: Cost, where: { carId, date: query } }, FineCategory],
    order: [[Cost, "date", "DESC"]]
  });
};

module.exports.listFineCategory = async function(carId, from, to) {
  return await FineCategory.findAll({});
};
