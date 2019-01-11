const Color = require("../startup/sequelize").Color;

module.exports.listColors = async function() {
  return await Color.findAll();
};
