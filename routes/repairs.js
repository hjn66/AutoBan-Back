const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");

const i18n = require("../middlewares/i18n");
const PartDAO = require("../DAO/partDAO");
const UserDAO = require("../DAO/userDAO");
const CarDAO = require("../DAO/carDAO");
const GarageDAO = require("../DAO/garageDAO");
const RepairDAO = require("../DAO/repairDAO");

router.post("/add-part-category", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const persianName = req.body.persianName;
  const englishName = req.body.englishName;
  let partCategory = await PartDAO.addPartCategory(persianName, englishName);
  return res.json({ success: true, message: __("Part category added successfuly"), partCategory });
});

router.get(
  "/list-part-categories",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let partCategories = await PartDAO.listPartCategory();
    return res.json({ success: true, partCategories });
  }
);

router.post("/add-part", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  let part = await PartDAO.addPart(req.body);
  return res.json({ success: true, message: __("Part added successfuly"), part });
});

router.post("/list-parts", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const categoryId = req.body.categoryId;
  let parts = await PartDAO.listPartByCategory(categoryId);
  return res.json({ success: true, parts: parts });
});

router.post("/add-repair", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const title = req.body.title;
  const date = req.body.date;
  const totalCost = req.body.totalCost;
  let garageName = req.body.garageName;
  const garageId = req.body.garageId;
  const carId = req.body.carId;
  let user = await UserDAO.getUserByAccountId(req.user.id);
  let car = await CarDAO.getCarById(carId);
  if (car.userId != user.id && req.user.type != config.get("repairman_type")) {
    throw new Error("You can add repair to car if car is yours or you are repairman");
  }
  if (garageId) {
    let garage = await GarageDAO.getGarageById(garageId);
    garageName = garage.name;
  }
  // title, date, totalCost, garageName, garageId, creatorId, carId
  let repair = RepairDAO.addRepair(title, date, totalCost, garageName, garageId, req.user.id, carId);
  return res.json({ success: true, message: __("Repair added successfuly"), repair });
});

module.exports = router;
