const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const rootDir = path.join(__dirname, "../");

const i18n = require("../middlewares/i18n");
const uploadFile = require("../middlewares/uploadFile");
const authorize = require("../middlewares/authorize");
const CarDAO = require("../DAO/carDAO");
const CarModelDAO = require("../DAO/carModelDAO");
const CarBrandDAO = require("../DAO/carBrandDAO");
const UserDAO = require("../DAO/userDAO");
const ColorDAO = require("../DAO/colorDAO");
const USER = config.get("user_type");
const ADMIN = config.get("admin_type");

router.post(
  "/register",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    user = await UserDAO.getUserByIdSync(req.user.id);
    const userId = user.id;
    const modelId = req.body.modelId;
    const colorId = req.body.colorId;
    var image = "";
    const name = req.body.name;
    const plate = req.body.plate;
    const odometer = req.body.odometer;
    const builtyear = req.body.builtyear;
    if (req.body.image) {
      image = await uploadFile(config.get("car_images_dir"), req.body.image);
    }
    car = await CarDAO.addCar(
      name,
      plate,
      image,
      odometer,
      builtyear,
      userId,
      modelId,
      colorId
    );
    return res.json({ success: true, car });
  }
);

router.put(
  "/update",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    const carId = req.body.carId;
    user = await UserDAO.getUserByIdSync(req.user.id);
    car = await CarDAO.getCarById(carId);
    const userId = user.id;
    if (car.userId != userId) {
      throw new Error("You can change your car information only");
    }
    car.name = req.body.name;
    car.plate = req.body.plate;
    car.odometer = req.body.odometer;
    car.builtyear = req.body.builtyear;
    car.modelId = req.body.modelId;
    car.colorId = req.body.colorId;
    if (car.image) {
      fs.removeSync(rootDir + "/" + car.image);
    }
    if (req.body.image) {
      car.image = await uploadFile(
        config.get("car_images_dir"),
        req.body.image
      );
    }
    car = await CarDAO.updateCar(car);
    return res.json({
      success: true,
      message: __("Car information updated successfuly")
    });
  }
);

router.delete(
  "/delete",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    const carId = req.body.carId;
    user = await UserDAO.getUserByIdSync(req.user.id);
    car = await CarDAO.getCarById(carId);
    const userId = user.id;
    if (car.userId != userId) {
      throw new Error("You can remove your car only");
    }
    car = await CarDAO.removeCar(car);
    return res.json({ success: true, message: __("Car deleted successfuly") });
  }
);

router.put(
  "/odometer",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    const carId = req.body.carId;
    const odometer = req.body.odometer;
    user = await UserDAO.getUserByIdSync(req.user.id);
    car = await CarDAO.getCarById(carId);
    if (car.userId != user.id) {
      throw new Error("You can change your car information only");
    }
    car = await CarDAO.updateOdometer(car, odometer);
    return res.json({
      success: true,
      message: __("Odometer updated successfuly")
    });
  }
);

router.get(
  "/list",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    user = await UserDAO.getUserByIdSync(req.user.id);
    cars = await CarDAO.listCars(user.id);
    return res.json({ success: true, cars });
  }
);

// Call By Admin
// get mobileNumber & return users cars
router.post(
  "/list-cars",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([ADMIN])],
  async (req, res, next) => {
    const mobileNumber = req.body.mobileNumber;
    let user = await UserDAO.getUser(mobileNumber);
    let cars = await CarDAO.listCars(user.id);
    return res.json({ success: true, cars });
  }
);

router.get(
  "/list-car-brands",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    carBrands = await CarBrandDAO.listCarBrands();
    return res.json({ success: true, carBrands });
  }
);

router.post(
  "/list-car-models",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const brandId = req.body.brandId;
    carModels = await CarModelDAO.listCarModels(brandId);
    return res.json({ success: true, carModels });
  }
);

router.get(
  "/list-colors",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    colors = await ColorDAO.list();
    return res.json({ success: true, colors });
  }
);

router.get(
  "/color",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    if (req.query.id) {
      let color = await ColorDAO.getById(req.query.id);
      return res.json({ success: true, color });
    } else {
      let color = await ColorDAO.getByName(req.query.persianName);
      return res.json({ success: true, color });
    }
  }
);

router.get(
  "/car-model",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    if (req.query.id) {
      let carModel = await CarModelDAO.getCarModelById(req.query.id);
      return res.json({ success: true, carModel });
    } else {
      let carModel = await CarModelDAO.getCarModelByName(req.query.persianName);
      return res.json({ success: true, carModel });
    }
  }
);

router.get(
  "/car-brand",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    if (req.query.id) {
      let carBrand = await CarBrandDAO.getCarBrandById(req.query.id);
      return res.json({ success: true, carBrand });
    } else {
      let carBrand = await CarBrandDAO.getCarBrandByName(req.query.persianName);
      return res.json({ success: true, carBrand });
    }
  }
);

module.exports = router;
