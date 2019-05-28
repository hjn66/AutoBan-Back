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

router.put(
  "/post",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    const blogPostId = req.body.id;
    let user = await UserDAO.getByIdSync(req.user.id);
    let blogPost = await BlogPostDAO.getById(blogPostId);
    const userId = user.id;
    if (blogPost.creatorId != userId) {
      throw new Error("You can change your blog post information only");
    }
    blogPost.subject = req.body.subject;
    blogPost.content = req.body.content;
    if (blogPost.image != config.get("default_blog_image")) {
      fs.removeSync(path.join(rootPath, blogPost.image));
    }
    if (req.body.image) {
      blogPost.image = await uploadFile(
        config.get("blog_images_dir"),
        req.body.image
      );
    }
    blogPost = await BlogPostDAO.update(blogPost);
    return res.json({
      success: true,
      message: __("Blog post information updated successfuly")
    });
  }
);

router.delete(
  "/post",
  [passport.authenticate("jwt", { session: false }), i18n, authorize([USER])],
  async (req, res, next) => {
    const blogPostId = req.query.id;
    console.log(blogPostId);

    let user = await UserDAO.getByIdSync(req.user.id);
    let blogPost = await BlogPostDAO.getById(blogPostId);
    const userId = user.id;
    if (blogPost.creatorId != userId) {
      throw new Error("You can remove your blog post only");
    }
    if (blogPost.image != config.get("default_blog_image")) {
      fs.removeSync(path.join(rootPath, blogPost.image));
    }
    blogPost = await BlogPostDAO.remove(blogPost);
    return res.json({
      success: true,
      message: __("Blog post deleted successfuly")
    });
  }
);

module.exports = router;
