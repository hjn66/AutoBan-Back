const passport = require("passport");
const express = require("express");
const router = express.Router();
const PartDAO = require("../DAO/partDAO");
const RepairDAO = require("../DAO/repairDAO");
const ReceiptDAO = require("../DAO/receiptDAO");

const i18n = require("../middlewares/i18n");

router.get(
  "/service-items",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    serviceItems = await PartDAO.getPeriodicServiceItems();
    return res.json({
      success: true,
      serviceItems
    });
  }
);

router.post(
  "/add",
  [
    passport.authenticate("jwt", { session: false }),
    i18n,
    upload.single("image")
  ],
  async (req, res, next) => {
    const date = req.body.date;
    const totalCost = req.body.totalCost;
    let garageName = req.body.garageName;
    const serviceItems = req.body.serviceItems;
    const garageId = req.body.garageId;
    const carId = req.body.carId;
    let car = await CarDAO.getCarById(carId);
    if (
      car.userId != req.user.id &&
      req.user.type != config.get("repairman_type")
    ) {
      throw new Error(
        "You can add periodic service to car if car is yours or you are repairman"
      );
    }
    if (garageId) {
      let garage = await GarageDAO.getGarageById(garageId);
      garageName = garage.name;
    }
    // title, date, totalCost, garageName, garageId, creatorId, carId
    let repair = await RepairDAO.addRepair(
      __("Periodic Service"),
      date,
      totalCost,
      garageName,
      garageId,
      req.user.id,
      carId
    );
  }
);

module.exports = router;
