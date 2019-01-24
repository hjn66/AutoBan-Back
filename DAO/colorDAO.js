const Color = require("../startup/sequelize").Color;

module.exports.getColorById = async function(id) {
  color = await Color.findByPk(id);
  if (!color) {
    throw new Error("Color not found");
  }
  return color;
};

module.exports.getColorByName = async function(persianName) {
  color = await Color.findOne({ where: { persianName } });
  if (!color) {
    throw new Error("Color not found");
  }
  return color;
};

module.exports.listColors = async function() {
  return await Color.findAll();
};
