const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const i18n = require("../middlewares/i18n");
const UserDAO = require("../DAO/usersDAO");
const CarDAO = require("../DAO/carsDAO");
const CostDAO = require("../DAO/costDAO");
const FuelDAO = require("../DAO/fuelDAO");

router.post("/add-fuel", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const date = req.body.date;
  const value = req.body.value;
  const comment = req.body.comment;
  const volume = req.body.volume;
  const type = req.body.type;
  const odometer = req.body.odometer;
  const isFull = req.body.isFull;
  const stationName = req.body.stationName;

  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can add cost to your car only");
  }
  cost = await CostDAO.addCost("FUEL", date, value, comment, carId);
  fuel = await FuelDAO.addFuel(volume, type, odometer, isFull, stationName, cost.id);
  if (odometer && odometer > car.odometer) {
    await CarDAO.updateOdometer(car, odometer);
  }
  return res.json({ success: true, message: __("Fuel information added successfuly") });
});

router.post("/delete-fuel", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const fuelId = req.body.fuelId;
  user = await UserDAO.getUserByAccountId(req.user.id);
  fuel = await FuelDAO.getFuelById(fuelId);
  cost = await CostDAO.getCostById(fuel.costId);
  car = await CarDAO.getCarById(cost.carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can remove your car's cost only");
  }
  await FuelDAO.removeFuel(fuel);
  await CostDAO.removeCost(cost);
  return res.json({ success: true, message: __("Fuel deleted successfuly") });
});

module.exports = router;
