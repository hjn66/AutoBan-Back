const config = require("config");
const Car = require("../startup/sequelize").Car;
const CarModel = require("../startup/sequelize").CarModel;
const Color = require("../startup/sequelize").Color;
const CarBrand = require("../startup/sequelize").CarBrand;

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getCarById = async function(id) {
  car = await Car.findByPk(id);
  if (!car) {
    throw new Error("Car not found");
  }
  return car;
};

module.exports.addCar = async function(name, plate, image, odometer, builtyear, userId, modelId, colorId) {
  if (image == "") {
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

module.exports.updateOdometer = async function(car, newOdometer) {
  car.odometer = newOdometer;
  return await car.save();
};

module.exports.updateCar = async function(car) {
  return await car.save();
};

module.exports.removeCar = async function(car) {
  return await car.destroy();
};

module.exports.listCars = async function(userId) {
  let cars = await Car.findAll({ where: { userId: userId }, include: [CarModel, Color] });
  for (const index in cars) {
    let brand = await CarBrand.findByPk(cars[index].car_model.carBrandId);
    cars[index].dataValues.car_brand = brand;
  }
  return cars;
};

module.exports.listCarBrands = async function() {
  return await CarBrand.findAll();
};

module.exports.listCarModels = async function(brandId) {
  return await CarModel.findAll({ where: { carBrandId: brandId } });
};
