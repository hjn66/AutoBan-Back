const passport = require("passport");
const express = require("express");
const router = express.Router();

const i18n = require("../middlewares/i18n");
const PartDAO = require("../DAO/partsDAO");

router.post("/add-part-category", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const persianName = req.body.persianName;
  const englishName = req.body.englishName;
  await PartDAO.addPartCategory(persianName, englishName);
  return res.json({ success: true, message: __("Part category added successfuly") });
});

router.get(
  "/list-part-categories",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    partCategories = await PartDAO.listPartCategory();
    return res.json({ success: true, partCategories: partCategories });
  }
);

router.post("/add-part", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  await PartDAO.addPart(req.body);
  return res.json({ success: true, message: __("Part added successfuly") });
});

router.post("/list-parts", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  const categoryId = req.body.categoryId;
  parts = await PartDAO.listPartByCategory(categoryId);
  return res.json({ success: true, parts: parts });
});

module.exports = router;
