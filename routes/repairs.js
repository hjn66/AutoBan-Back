const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");

const i18n = rootRequire("middlewares/i18n");
const PartDAO = rootRequire("DAO/partDAO");
const CarServiceDAO = rootRequire("DAO/carServiceDAO");
const CarDAO = rootRequire("DAO/carDAO");
const GarageDAO = rootRequire("DAO/garageDAO");
const RepairDAO = rootRequire("DAO/repairDAO");
const ReceiptDAO = rootRequire("DAO/receiptDAO");

router.post(
  "/add-part-category",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const persianName = req.body.persianName;
    const englishName = req.body.englishName;
    let partCategory = await PartDAO.addPartCategory(persianName, englishName);
    return res.json({
      success: true,
      message: __("Part category added successfuly"),
      partCategory
    });
  }
);

router.delete(
  "/part-category",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const categoryId = req.body.categoryId;
    let partCategory = await PartDAO.getPartCategoryById(categoryId);
    await PartDAO.removePartCategory(partCategory);
    return res.json({
      success: true,
      message: __("Part category deleted successfuly")
    });
  }
);

router.put(
  "/part-category",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const persianName = req.body.persianName;
    const englishName = req.body.englishName;
    const categoryId = req.body.categoryId;
    let partCategory = await PartDAO.getPartCategoryById(categoryId);
    partCategory.persianName = persianName;
    partCategory.englishName = englishName;
    partCategory = await PartDAO.updatePartCategory(partCategory);
    return res.json({
      success: true,
      message: __("Part category updated successfuly"),
      partCategory
    });
  }
);

router.get(
  "/list-part-categories",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let partCategories = await PartDAO.listPartCategory();
    return res.json({ success: true, partCategories });
  }
);

router.post(
  "/add-part",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let part = await PartDAO.addPart(req.body);
    return res.json({
      success: true,
      message: __("Part added successfuly"),
      part
    });
  }
);

router.post(
  "/list-parts",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const categoryId = req.body.categoryId;
    let parts = await PartDAO.listPartByCategory(categoryId);
    return res.json({ success: true, parts: parts });
  }
);

router.post(
  "/add-service",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const persianName = req.body.persianName;
    const englishName = req.body.englishName;
    let carService = await CarServiceDAO.addCarService(
      persianName,
      englishName
    );
    return res.json({
      success: true,
      message: __("car service added successfuly"),
      carService
    });
  }
);

router.put(
  "/service",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const persianName = req.body.persianName;
    const englishName = req.body.englishName;
    const serviceId = req.body.serviceId;
    let carService = await CarServiceDAO.getServiceById(serviceId);
    carService.persianName = persianName;
    carService.englishName = englishName;
    carService = await CarServiceDAO.updateCarService(carService);
    return res.json({
      success: true,
      message: __("car service updated successfuly"),
      carService
    });
  }
);

router.delete(
  "/service",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const serviceId = req.body.serviceId;
    let carService = await CarServiceDAO.getServiceById(serviceId);
    await CarServiceDAO.removeCarService(carService);
    return res.json({
      success: true,
      message: __("car service deleted successfuly")
    });
  }
);

router.get(
  "/list-services",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let carServices = await CarServiceDAO.listCarService();
    return res.json({ success: true, carServices });
  }
);

router.post(
  "/add-repair",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const title = req.body.title;
    const date = req.body.date;
    const totalCost = req.body.totalCost;
    let garageName = req.body.garageName;
    const garageId = req.body.garageId;
    const carId = req.body.carId;
    let car = await CarDAO.getCarById(carId);
    if (
      car.userId != req.user.id &&
      req.user.type != config.get("repairman_type")
    ) {
      throw new Error(
        "You can add repair to car if car is yours or you are repairman"
      );
    }
    if (garageId) {
      let garage = await GarageDAO.getGarageById(garageId);
      garageName = garage.name;
    }
    // title, date, totalCost, garageName, garageId, creatorId, carId
    let repair = await RepairDAO.add(
      title,
      date,
      totalCost,
      garageName,
      garageId,
      req.user.id,
      carId
    );
    return res.json({
      success: true,
      message: __("Repair added successfuly"),
      repair
    });
  }
);

router.delete(
  "/repair",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const repairId = req.body.repairId;
    let repair = await RepairDAO.getById(repairId);
    if (req.user.id != repair.creatorId) {
      throw new Error("You can remove only repair that you added");
    }
    await RepairDAO.remove(repair);
    return res.json({
      success: true,
      message: __("Repair deleted successfuly")
    });
  }
);

router.post(
  "/add-receipt",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const title = req.body.title;
    const date = req.body.date;
    const totalCost = req.body.totalCost;
    const shopName = req.body.shopName;
    const repairId = req.body.repairId;

    let repair = await RepairDAO.getById(repairId);
    if (req.user.id != repair.creatorId) {
      throw new Error("You can add receipt to repair that you added");
    }
    let receipImage = "";
    if (req.body.image) {
      receipImage = await uploadFile(
        config.get("receipt_images_dir"),
        req.body.image
      );
    }
    let receipt = await ReceiptDAO.add(
      title,
      date,
      totalCost,
      shopName,
      receipImage,
      repairId
    );
    await ReceiptDAO.updateRepairCost(repair);
    return res.json({
      success: true,
      message: __("Receipt added successfuly"),
      receipt
    });
  }
);

router.delete(
  "/receipt",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const receiptId = req.body.receiptId;
    let receipt = await ReceiptDAO.getById(receiptId);

    let repair = await RepairDAO.getById(receipt.repairId);
    if (req.user.id != repair.creatorId) {
      throw new Error("You can remove receipt from repair that you added");
    }
    await ReceiptDAO.remove(receipt);
    await ReceiptDAO.updateRepairCost(repair);
    return res.json({
      success: true,
      message: __("Receipt deleted successfuly")
    });
  }
);

router.put(
  "/receipt-items",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const services = req.body.services;
    const products = req.body.products;
    const receiptId = req.body.receiptId;

    let receipt = await ReceiptDAO.getById(receiptId);
    let repair = await RepairDAO.getById(receipt.repairId);
    if (req.user.id != repair.creatorId) {
      throw new Error("You can update receipt Items of repair that you added");
    }

    await ReceiptDAO.removeItems(receipt.id);
    await ReceiptDAO.addItems(receipt.id, services, products);
    await ReceiptDAO.updateReceiptCost(receipt);
    await ReceiptDAO.updateRepairCost(repair);
    return res.json({
      success: true,
      message: __("Receipt Items updated successfuly"),
      receipt
    });
  }
);

// serverAddress/repairs/list?carId=
router.get(
  "/list",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    const carId = req.query.carId;
    let repairs = await RepairDAO.list(carId);
    return res.json({
      success: true,
      repairs
    });
  }
);

module.exports = router;
