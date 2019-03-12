const CarModel = rootRequire("startup/sequelize").CarModel;

module.exports.getById = async function(id) {
  carModel = await CarModel.findByPk(id);
  if (!carModel) {
    throw new Error("Car model not found");
  }
  return carModel;
};

module.exports.getByName = async function(persianName) {
  carModel = await CarModel.findOne({ where: { persianName } });
  if (!carModel) {
    throw new Error("Car model not found");
  }
  return carModel;
};

module.exports.listCarModels = async function(brandId) {
  return await CarModel.findAll({ where: { carBrandId: brandId } });
};
