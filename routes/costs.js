const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const i18n = rootRequire("middlewares/i18n");
const CarDAO = rootRequire("DAO/carDAO");
const CostDAO = rootRequire("DAO/costDAO");
const FuelDAO = rootRequire("DAO/fuelDAO");
const FineDAO = rootRequire("DAO/fineDAO");
const PeriodicCostDAO = rootRequire("DAO/periodicCostDAO");

//TODO list for all cost types, update for all cost types
router.post(
  "/fuel",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const volume = req.body.volume;
    const type = req.body.type;
    const odometer = req.body.odometer;
    const isFull = req.body.isFull;
    const stationName = req.body.stationName;

    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can add cost to your car only");
    }
    let cost = await CostDAO.addCost("FUEL", date, value, comment, carId);
    let fuel = await FuelDAO.addFuel(
      volume,
      type,
      odometer,
      isFull,
      stationName,
      cost.id
    );
    fuel.dataValues.cost = cost;
    if (odometer && odometer > car.odometer) {
      await CarDAO.updateOdometer(car, odometer);
    }
    return res.json({
      success: true,
      message: __("Fuel information added successfuly"),
      fuel
    });
  }
);

router.put(
  "/fuel",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const fuelId = req.body.id;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const volume = req.body.volume;
    const type = req.body.type;
    const odometer = req.body.odometer;
    const isFull = req.body.isFull || false;
    const stationName = req.body.stationName;

    let fuel = await FuelDAO.getFuelById(fuelId);
    let cost = fuel.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can update your car's cost only");
    }
    cost.date = date;
    cost.value = value;
    cost.comment = comment;
    cost = await CostDAO.updateCost(cost);
    fuel.volume = volume;
    fuel.type = type;
    fuel.odometer = odometer;
    fuel.isFull = isFull;
    fuel.stationName = stationName;
    fuel = await FuelDAO.updateFuel(fuel);
    fuel.cost = cost;
    if (odometer && odometer > car.odometer) {
      await CarDAO.updateOdometer(car, odometer);
    }
    return res.json({
      success: true,
      message: __("Fuel information updated successfuly"),
      fuel
    });
  }
);

router.delete(
  "/fuel",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const fuelId = req.query.fuelId;
    let fuel = await FuelDAO.getFuelById(fuelId);
    let cost = fuel.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can remove your car's cost only");
    }
    await CostDAO.removeCost(cost);
    return res.json({ success: true, message: __("Fuel deleted successfuly") });
  }
);

router.get(
  "/fine-categories",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let fineCategories = await FineDAO.listFineCategory();
    return res.json({ success: true, fineCategories });
  }
);

router.post(
  "/fine",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const fineCode = req.body.fineCode;

    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can add cost to your car only");
    }
    let cost = await CostDAO.addCost("FINE", date, value, comment, carId);
    let fine = await FineDAO.addFine(fineCode, cost.id);
    fine.dataValues.cost = cost;
    return res.json({
      success: true,
      message: __("Fine information added successfuly"),
      fine
    });
  }
);

router.put(
  "/fine",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const fineId = req.body.id;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const fineCode = req.body.fineCode;

    let fine = await FineDAO.getFineById(fineId);
    let cost = fine.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can update your car's cost only");
    }
    cost.date = date;
    cost.value = value;
    cost.comment = comment;
    cost = await CostDAO.updateCost(cost);
    fine.fineCode = fineCode;
    fine = await FineDAO.updateFine(fine);
    fine.cost = cost;

    return res.json({
      success: true,
      message: __("Fine information updated successfuly"),
      fine
    });
  }
);

router.delete(
  "/fine",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const fineId = req.query.fineId;
    let fine = await FineDAO.getFineById(fineId);
    let cost = fine.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can remove your car's cost only");
    }
    await CostDAO.removeCost(cost);
    return res.json({ success: true, message: __("Fine deleted successfuly") });
  }
);

router.post(
  "/periodic",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const type = req.body.type;
    const period = req.body.period;

    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can add cost to your car only");
    }
    let cost = await CostDAO.addCost(type, date, value, comment, carId);
    let periodicCost = await PeriodicCostDAO.addPeriodicCost(
      type,
      period,
      cost.id
    );
    periodicCost.dataValues.cost = cost;
    return res.json({
      success: true,
      message: __("PeriodicCost information added successfuly"),
      periodicCost
    });
  }
);

router.put(
  "/periodic",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const periodicCostId = req.body.id;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;
    const type = req.body.type;
    const period = req.body.period;

    let periodicCost = await PeriodicCostDAO.getPeriodicCostById(
      periodicCostId
    );
    let cost = periodicCost.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can update your car's cost only");
    }
    cost.date = date;
    cost.value = value;
    cost.comment = comment;
    cost = await CostDAO.updateCost(cost);
    periodicCost.type = type;
    periodicCost.period = period;
    periodicCost = await PeriodicCostDAO.updatePeriodicCost(periodicCost);
    periodicCost.cost = cost;

    return res.json({
      success: true,
      message: __("PeriodicCost information updated successfuly"),
      periodicCost
    });
  }
);

router.delete(
  "/periodic",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const periodicCostId = req.query.periodicCostId;
    let periodicCost = await PeriodicCostDAO.getPeriodicCostById(
      periodicCostId
    );
    let cost = periodicCost.cost;
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can remove your car's cost only");
    }
    await CostDAO.removeCost(cost);
    return res.json({
      success: true,
      message: __("PeriodicCost deleted successfuly")
    });
  }
);

router.post(
  "/other",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;

    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can add cost to your car only");
    }
    let cost = await CostDAO.addCost(
      config.get("other_cost_type"),
      date,
      value,
      comment,
      carId
    );
    return res.json({
      success: true,
      message: __("Cost information added successfuly"),
      cost
    });
  }
);

router.put(
  "/other",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const costId = req.body.id;
    const date = req.body.date;
    const value = req.body.value;
    const comment = req.body.comment;

    let cost = await CostDAO.getCostById(costId);
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can update your car's cost only");
    }
    cost.date = date;
    cost.value = value;
    cost.comment = comment;
    cost = await CostDAO.updateCost(cost);
    return res.json({
      success: true,
      message: __("Cost information updated successfuly"),
      cost
    });
  }
);

router.delete(
  "/other",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const costId = req.query.costId;
    let cost = await CostDAO.getCostById(costId);
    let car = await CarDAO.getById(cost.carId);
    if (car.userId != req.user.id) {
      throw new Error("You can remove your car's cost only");
    }
    await CostDAO.removeCost(cost);
    return res.json({
      success: true,
      message: __("Cost information deleted successfuly")
    });
  }
);

router.post(
  "/list",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const from = req.body.from;
    const to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    // let costs = await CostDAO.listCostByCar(carId, from, to);
    let fines = await FineDAO.listFineByCar(carId, from, to);
    let fuels = await FuelDAO.listFuelByCar(carId, from, to);
    let periodicCosts = await PeriodicCostDAO.listPeriodicCostByCar(
      carId,
      from,
      to
    );
    let otherCosts = await CostDAO.listOtherCostByCar(carId, from, to);
    return res.json({ success: true, fines, fuels, periodicCosts, otherCosts });
  }
);

router.post(
  "/list-fuels",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const from = req.body.from;
    const to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    let fuels = await FuelDAO.listFuelByCar(carId, from, to);
    return res.json({ success: true, fuels });
  }
);

router.post(
  "/list-fines",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const from = req.body.from;
    const to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    let fines = await FineDAO.listFineByCar(carId, from, to);
    return res.json({ success: true, fines });
  }
);

router.post(
  "/list-periodics",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const from = req.body.from;
    const to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    let periodicCosts = await PeriodicCostDAO.listPeriodicCostByCar(
      carId,
      from,
      to
    );
    return res.json({ success: true, periodicCosts });
  }
);

router.post(
  "/list-others",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    const from = req.body.from;
    const to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    let costs = await CostDAO.listOtherCostByCar(carId, from, to);
    return res.json({ success: true, costs });
  }
);

router.post(
  "/list-categorized",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.body.carId;
    from = req.body.from;
    to = req.body.to;
    let car = await CarDAO.getById(carId);
    if (car.userId != req.user.id) {
      throw new Error("You can list your car's cost only");
    }
    let costs = await CostDAO.listCategorizedCostByCar(carId, from, to);
    return res.json({ success: true, costs });
  }
);

module.exports = router;
