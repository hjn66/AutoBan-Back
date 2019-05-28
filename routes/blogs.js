const passport = require("passport");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const i18n = rootRequire("middlewares/i18n");
const uploadFile = rootRequire("middlewares/uploadFile");
const authorize = rootRequire("middlewares/authorize");
const checkPoint = rootRequire("middlewares/checkPoint");
const BlogPostDAO = DAOs.BlogPostDAO;
const UserDAO = DAOs.UserDAO;
const USER = config.get("user_type");
const ADMIN = config.get("admin_type");

router.post(
  "/post",
  [
    passport.authenticate("jwt", { session: false }),
    i18n,
    authorize([USER]),
    checkPoint
  ],
  async (req, res, next) => {
    let user = await UserDAO.getByIdSync(req.user.id);
    const creatorId = user.id;
    const subject = req.body.subject;
    console.log(subject);
    const content = req.body.content;
    let image = "";
    if (req.body.image) {
      image = await uploadFile(config.get("blog_images_dir"), req.body.image);
    }
    let blogPost = await BlogPostDAO.add(creatorId, subject, content, image);
    res.json({ success: true, blogPost });
    next();
  }
);

module.exports = router;
