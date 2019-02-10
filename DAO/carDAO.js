const config = require("config");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const Car = rootRequire("startup/sequelize").Car;
const CarModel = rootRequire("startup/sequelize").CarModel;
const Color = rootRequire("startup/sequelize").Color;
const CarBrand = rootRequire("startup/sequelize").CarBrand;
const Utils = rootRequire("middlewares/utils");

module.exports.getById = async function(id) {
  car = await Car.findByPk(id);
  if (!car) {
    throw new Error("Car not found");
  }
  return car;
};

module.exports.add = async function(
  name,
  plate,
  image,
  odometer,
  builtyear,
  userId,
  modelId,
  colorId
) {
  if (!image || image == "") {
    carModel = await CarModel.findByPk(modelId);
    if (!carModel) {
      throw new Error("Car model not found");
    }
    carBrand = await CarBrand.findByPk(carModel.carBrandId);
    image = config.get("car_logo_dir") + carBrand.logo;
  }
  return await Car.create({
    name: name,
    plate: plate,
    image: image,
    odometer: odometer,
    builtyear: builtyear,
    userId: userId,
    modelId: modelId,
    colorId: colorId
  });
};

module.exports.updateOdometer = async function(car, newOdometer) {
  car.odometer = newOdometer;
  return await car.save();
};

module.exports.update = async function(car) {
  return await car.save();
};

module.exports.remove = async function(car) {
  return await car.destroy();
};

module.exports.list = async function(userId) {
  let cars = await Car.findAll({
    where: { userId: userId },
    include: [CarModel, Color]
  });
  for (const index in cars) {
    let brand = await CarBrand.findByPk(cars[index].car_model.carBrandId);
    cars[index].dataValues.car_brand = brand;
  }
  return cars;
};

module.exports.Count = async function(userId, period) {
  let query = { userId };
  if (period) {
    query["createdAt"] = { [Op.gte]: Utils.subPeriod(new Date(), period) };
  }
  result = await Car.findOne({
    where: query,
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "count"]]
  });
  return await result.dataValues.count;
};
