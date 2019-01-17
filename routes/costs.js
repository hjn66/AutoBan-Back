const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const i18n = require("../middlewares/i18n");
const UserDAO = require("../DAO/userDAO");
const CarDAO = require("../DAO/carDAO");
const CostDAO = require("../DAO/costDAO");
const FuelDAO = require("../DAO/fuelDAO");
const FineDAO = require("../DAO/fineDAO");
const PeriodicCostDAO = require("../DAO/PeriodicCostDAO");

//TODO list for all cost types, update for all cost types
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

router.delete("/fuel", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
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

router.post("/add-fine", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const date = req.body.date;
  const value = req.body.value;
  const comment = req.body.comment;
  const fineCode = req.body.fineCode;

  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can add cost to your car only");
  }
  cost = await CostDAO.addCost("FINE", date, value, comment, carId);
  fine = await FineDAO.addFine(fineCode, cost.id);
  return res.json({ success: true, message: __("Fine information added successfuly") });
});

router.delete("/fine", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const fineId = req.body.fineId;
  user = await UserDAO.getUserByAccountId(req.user.id);
  fine = await FineDAO.getFineById(fineId);
  cost = await CostDAO.getCostById(fine.costId);
  car = await CarDAO.getCarById(cost.carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can remove your car's cost only");
  }
  await FineDAO.removeFine(fine);
  await CostDAO.removeCost(cost);
  return res.json({ success: true, message: __("Fine deleted successfuly") });
});

router.post("/add-periodic", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const date = req.body.date;
  const value = req.body.value;
  const comment = req.body.comment;
  const type = req.body.type;
  const period = req.body.period;

  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can add cost to your car only");
  }
  cost = await CostDAO.addCost(type, date, value, comment, carId);
  await PeriodicCostDAO.addPeriodicCost(type, period, cost.id);
  return res.json({ success: true, message: __("PeriodicCost information added successfuly") });
});

router.delete("/periodic", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const periodicCostId = req.body.periodicCostId;
  user = await UserDAO.getUserByAccountId(req.user.id);
  periodicCost = await PeriodicCostDAO.getFineById(periodicCostId);
  cost = await CostDAO.getCostById(periodicCost.costId);
  car = await CarDAO.getCarById(cost.carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can remove your car's cost only");
  }
  await PeriodicCostDAO.removePeriodicCost(periodicCost);
  await CostDAO.removeCost(cost);
  return res.json({ success: true, message: __("PeriodicCost deleted successfuly") });
});

router.post("/add-other", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const date = req.body.date;
  const value = req.body.value;
  const comment = req.body.comment;

  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can add cost to your car only");
  }
  cost = await CostDAO.addCost("OTHER", date, value, comment, carId);
  return res.json({ success: true, message: __("Cost information added successfuly") });
});

router.delete("/other", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const costId = req.body.costId;
  user = await UserDAO.getUserByAccountId(req.user.id);
  cost = await CostDAO.getCostById(costId);
  car = await CarDAO.getCarById(cost.carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can remove your car's cost only");
  }
  await CostDAO.removeCost(cost);
  return res.json({ success: true, message: __("Cost deleted successfuly") });
});

router.post("/list", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const from = req.body.from;
  const to = req.body.to;
  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can list your car's cost only");
  }
  costs = await CostDAO.listCostByCar(carId, from, to);
  return res.json({ success: true, costs: costs });
});

router.post("/list-categorized", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  from = req.body.from;
  to = req.body.to;
  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can list your car's cost only");
  }
  costs = await CostDAO.listCategorizedCostByCar(carId, from, to);
  return res.json({ success: true, costs: costs });
});

module.exports = router;
