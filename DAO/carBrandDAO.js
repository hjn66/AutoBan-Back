const CarBrand = require("../startup/sequelize").CarBrand;

module.exports.getCarBrandById = async function(id) {
  carBrand = await CarBrand.findByPk(id);
  if (!carBrand) {
    throw new Error("Car brand not found");
  }
  return carBrand;
};

module.exports.getCarBrandByName = async function(persianName) {
  carBrand = await CarBrand.findOne({ where: { persianName } });
  if (!carBrand) {
    throw new Error("Car brand not found");
  }
  return carBrand;
};

module.exports.listCarBrands = async function() {
  return await CarBrand.findAll();
};
