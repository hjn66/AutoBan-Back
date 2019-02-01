const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const i18n = require("../middlewares/i18n");
const uploadFile = require("../middlewares/uploadFile");
const UserDAO = require("../DAO/userDAO");
const SMSTokenDAO = require("../DAO/smsTokenDAO");

// get mobileNumber in body and return token
router.post("/get-sms-token", i18n, async (req, res, next) => {
  const mobileNumber = req.body.mobileNumber;
  token = await SMSTokenDAO.getToken(mobileNumber);
  // await sms.sendSMS(mobileNumber, __("Your verification code to AutoBanApp is : %i", token.token));
  // res.json({ success: true, message: __("Verification code sent") });
  res.json({ success: true, token });
});

// get token and mobileNumber in body and check token is valid and return jwt token for register or login
router.post("/check-sms-token", i18n, async (req, res, next) => {
  smsToken = await SMSTokenDAO.checkToken(req.body);
  const token = jwt.sign(
    { type: "SMS", mobileNumber: smsToken.mobileNumber },
    config.get("JWTsecret"),
    {
      expiresIn: config.get("jwt_sms_token_exp_sec")
    }
  );
  return res.json({
    success: true,
    token: "JWT " + token
  });
});

// Authenticate with username(mobileNumber or email) and password
router.post("/authenticate-password", i18n, async (req, res, next) => {
  let user = await UserDAO.getUser(req.body.username);
  if (!user.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }
  isMatch = await UserDAO.comparePassword(req.body.password, user.password);
  if (isMatch) {
    user["password"] = "***";
    const token = jwt.sign({ type: "AUTH", user }, config.get("JWTsecret"));
    return res.json({
      success: true,
      token: "JWT " + token,
      user
    });
  } else {
    throw new Error("Wrong Password");
  }
});

// Authenticate by token returend by /check-sms-token
router.get(
  "/authenticate-token",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let user = await UserDAO.getUser(req.user);
    if (!user.enabled) {
      throw new Error(
        "Your Account dissabled by admin, please contact to admin"
      );
    }
    user["password"] = "***";
    const token = jwt.sign({ type: "AUTH", user }, config.get("JWTsecret"));
    return res.json({
      success: true,
      token: "JWT " + token,
      user
    });
  }
);

// register with password and token returned by check-sms-token
// input (req.body): *firstName, *lastName, email, profilePic(file)
router.post(
  "/register",
  [passport.authenticate("jwt", { session: false }), i18n],
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
    if (req.body.image) {
      profilePic = await uploadFile(
        config.get("user_images_dir"),
        req.body.image
      );
    }
    let user = await UserDAO.addUser(
      mobileNumber,
      password,
      config.get("user_type"),
      firstName,
      lastName,
      email,
      profilePic
    );
    user["password"] = "***";
    const token = jwt.sign({ type: "AUTH", user }, config.get("JWTsecret"));
    return res.json({ success: true, token: "JWT " + token, user });
  }
);

// update user profile information and if profilePic uploaded then update it
// input (req.body): *firstName, *lastName, email, profilePic(file)
router.put(
  "/user",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let user = await UserDAO.getUserByIdSync(req.user.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    if (req.body.image) {
      fs.removeSync(path.join(rootPath, user.profileImage));
      user.profileImage = await uploadFile(
        config.get("user_images_dir"),
        req.body.image
      );
    }
    user = await UserDAO.updateUser(user);
    return res.json({
      success: true,
      message: __("User information updated successfuly"),
      user
    });
  }
);

// check token number and change user mobile number
// input: mobileNumber, token
router.put(
  "/mobile",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    smsToken = await SMSTokenDAO.checkToken(req.body);
    user = await UserDAO.getUserByIdSync(req.user.id);
    user.mobileNumber = smsToken.mobileNumber;
    user = await UserDAO.updateUser(user);
    return res.json({ success: true, user });
  }
);

// return user profile information
router.get(
  "/profile",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    user = await UserDAO.getUserByIdSync(req.user.id);
    return res.json({ success: true, user });
  }
);

module.exports = router;
