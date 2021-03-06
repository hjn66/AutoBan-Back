const CarBrand = rootRequire("startup/sequelize").CarBrand;

module.exports.getById = async function(id) {
  carBrand = await CarBrand.findByPk(id);
  if (!carBrand) {
    throw new Error("Car brand not found");
  }
  return carBrand;
};

module.exports.getByName = async function(persianName) {
  carBrand = await CarBrand.findOne({ where: { persianName } });
  if (!carBrand) {
    throw new Error("Car brand not found");
  }
  return carBrand;
};

module.exports.add = async function(id, persianName, englishName, logo) {
  return await CarBrand.create({ id, persianName, englishName, logo });
};

module.exports.update = async function(brand) {
  return await brand.save();
};

module.exports.listCarBrands = async function() {
  return await CarBrand.findAll();
};
