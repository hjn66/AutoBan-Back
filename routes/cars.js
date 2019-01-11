const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const rootDir = path.join(__dirname, "../");
const multer = require("multer");
const randToken = require("rand-token");

const i18n = require("../middlewares/i18n");
const CarDAO = require("../DAO/carDAO");
const UserDAO = require("../DAO/userDAO");
const ColorDAO = require("../DAO/colorDAO");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./" + config.get("car_images_dir"));
  },
  filename: function(req, file, cb) {
    raw = randToken.generate(16);
    cb(null, raw.toString("hex") + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

router.post(
  "/register",
  [passport.authenticate("jwt", { session: false }), i18n, upload.single("carImage")],
  async (req, res, next) => {
    user = await UserDAO.getUserByAccountId(req.user.id);
    const userId = user.id;
    const modelId = req.body.modelId;
    const colorId = req.body.colorId;
    var image = "";
    const name = req.body.name;
    const plate = req.body.plate;
    const odometer = req.body.odometer;
    const bulityear = req.body.bulityear;

    if (req.file) {
      image = config.get("car_images_dir") + "/" + req.file.filename;
    }
    car = await CarDAO.addCar(name, plate, image, odometer, bulityear, userId, modelId, colorId);
    return res.json({ success: true, car: car });
  }
);

router.post(
  "/update",
  [passport.authenticate("jwt", { session: false }), i18n, upload.single("carImage")],
  async (req, res, next) => {
    const carId = req.body.carId;
    user = await UserDAO.getUserByAccountId(req.user.id);
    car = await CarDAO.getCarById(carId);
    const userId = user.id;
    if (car.userId != userId) {
      throw new Error("You can change your car information only");
    }
    car.name = req.body.name;
    car.plate = req.body.plate;
    car.odometer = req.body.odometer;
    car.bulityear = req.body.bulityear;
    car.modelId = req.body.modelId;
    car.colorId = req.body.colorId;
    if (req.file) {
      fs.removeSync(rootDir + "/" + car.image);
      car.image = config.get("car_images_dir") + "/" + req.file.filename;
    }
    car = await CarDAO.updateCar(car);
    return res.json({ success: true, message: __("Car information updated successfuly") });
  }
);

router.post("/delete", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  const userId = user.id;
  if (car.userId != userId) {
    throw new Error("You can remove your car only");
  }
  car = await CarDAO.removeCar(car);
  return res.json({ success: true, message: __("Car deleted successfuly") });
});

router.post("/update-odometer", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const carId = req.body.carId;
  const odometer = req.body.odometer;
  user = await UserDAO.getUserByAccountId(req.user.id);
  car = await CarDAO.getCarById(carId);
  if (car.userId != user.id) {
    throw new Error("You can change your car information only");
  }
  car = await CarDAO.updateOdometer(car, odometer);
  return res.json({ success: true, message: __("Odometer updated successfuly") });
});

router.get("/list", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  user = await UserDAO.getUserByAccountId(req.user.id);
  cars = await CarDAO.listCars(user.id);
  return res.json({ success: true, cars: cars });
});

router.get("/list-car-brands", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  carBrands = await CarDAO.listCarBrands();
  return res.json({ success: true, carBrands: carBrands });
});

router.post("/list-car-models", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const brandId = req.body.brandId;
  carModels = await CarDAO.listCarModels(brandId);
  return res.json({ success: true, carModels: carModels });
});

router.get("/list-colors", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  colors = await ColorDAO.listColors();
  return res.json({ success: true, colors: colors });
});

module.exports = router;
