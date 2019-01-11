const Garage = require("../startup/sequelize").Garage;
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addGarage = async function(name, phoneNumber, latitude, longitude, image, address) {
  return await Garage.create({ name, phoneNumber, latitude, longitude, image, address });
};
