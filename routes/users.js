const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const multer = require("multer");
const randToken = require("rand-token");

const i18n = require("../middlewares/i18n");
const AccountDAO = require("../DAO/accountDAO");
const UserDAO = require("../DAO/userDAO");
const SMSTokenDAO = require("../DAO/smsTokenDAO");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./" + config.get("user_images_dir"));
  },
  filename: function(req, file, cb) {
    raw = randToken.generate(16);
    cb(null, raw.toString("hex") + Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage: storage });

// register with password and token returned by check-sms-token
// input (req.body): *firstName, *lastName, email, profilePic(file)
router.post(
  "/register",
  [passport.authenticate("jwt", { session: false }), i18n, upload.single("profilePic")],
  async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    const mobileNumber = req.user;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    var profilePic = "";
    if (!firstName || !lastName) {
      throw new Error("firstName and lastName required");
    }
    if (req.file) {
      profilePic = path.join(config.get("user_images_dir"), req.file.filename);
    }
    account = await AccountDAO.addAccount(mobileNumber, password, config.get("user_type"));
    user = await UserDAO.addUser(firstName, lastName, email, profilePic, account.id);
    account["password"] = "***";
    const token = jwt.sign({ type: "AUTH", account: account }, config.get("JWTsecret"));
    return res.json({ success: true, token: "JWT " + token, user: user });
  }
);

// update user profile information and if profilePic uploaded then update it
// input (req.body): *firstName, *lastName, email, profilePic(file)
router.post(
  "/update",
  [passport.authenticate("jwt", { session: false }), i18n, upload.single("profilePic")],
  async (req, res, next) => {
    user = await UserDAO.getUserByAccountId(req.user.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    if (req.file) {
      fs.removeSync(path.join(rootPath, user.profileImage));
      user.profileImage = path.join(config.get("user_images_dir"), req.file.filename);
    }
    user = await UserDAO.updateUser(user);
    return res.json({ success: true, message: __("User information updated successfuly") });
  }
);

// check token number and change user mobile number
// input: mobileNumber, token
router.post("/change-mobile", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  smsToken = await SMSTokenDAO.checkToken(req.body);
  user = await UserDAO.getUserByAccountId(req.user.id);
  user.mobileNumber = smsToken.mobileNumber;
  user = await UserDAO.updateUser(user);
  return res.json({ success: true, user: user });
});

// return user profile information
router.get("/profile", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  user = await UserDAO.getUserByAccountId(req.user.id);
  return res.json({ success: true, user: user });
});

module.exports = router;
