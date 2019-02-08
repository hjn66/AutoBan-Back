const Color = rootRequire("startup/sequelize").Color;

module.exports.getById = async function(id) {
  color = await Color.findByPk(id);
  if (!color) {
    throw new Error("Color not found");
  }
  return color;
};

module.exports.getByName = async function(persianName) {
  color = await Color.findOne({ where: { persianName } });
  if (!color) {
    throw new Error("Color not found");
  }
  return color;
};

module.exports.update = async function(color) {
  return await color.save();
};

module.exports.list = async function() {
  return await Color.findAll();
};

module.exports.add = async function(persianName, englishName, code) {
  return await Color.create({ persianName, englishName, code });
};
