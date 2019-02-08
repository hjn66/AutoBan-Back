const Sequelize = require("sequelize");

const Points = rootRequire("startup/sequelize").Points;

module.exports.getById = async function(id) {
  let point = await Points.findByPk(id);
  if (!point) {
    throw new Error("Point record not found");
  }
  return point;
};

module.exports.add = async function(userId, url, reason, point) {
  return await Points.create({ userId, url, reason, point });
};
