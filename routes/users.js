const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");
const path = require("path");
const fs = require("fs-extra");

const i18n = rootRequire("middlewares/i18n");
const uploadFile = rootRequire("middlewares/uploadFile");
const UserDAO = rootRequire("DAO/userDAO");
const SMSTokenDAO = rootRequire("DAO/smsTokenDAO");

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
  let user = await UserDAO.getByUsername(req.body.username);
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
    let user = await UserDAO.getByUsername(req.user);
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
// input (req.body): *firstName, *lastName, email, profilePic(file), refferal
router.post(
  "/register",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    console.log(req.body.firstName);
    const password = req.body.password;
    const email = req.body.email;
    const mobileNumber = req.user;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const refferal = req.body.referral;
    if (refferal) {
      let referralUser = await UserDAO.getByCode(req.body.referral);
      if (!referralUser) {
        throw new Error("Invalid referral code");
      }
      req.inviter = referralUser.id;
    }
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
    let user = await UserDAO.add(
      mobileNumber,
      password,
      config.get("user_type"),
      firstName,
      lastName,
      email,
      profilePic,
      refferal
    );
    user["password"] = "***";
    const token = jwt.sign({ type: "AUTH", user }, config.get("JWTsecret"));
    res.json({ success: true, token: "JWT " + token, user });
    if (refferal) {
      req.invitee = user.id;
    }
    next();
  }
);

// update user profile information and if profilePic uploaded then update it
// input (req.body): *firstName, *lastName, email, profilePic(file)
router.put(
  "/user",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    let user = await UserDAO.getByIdSync(req.user.id);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    if (user.profileImage) {
      fs.removeSync(path.join(rootPath, user.profileImage));
    }
    if (req.body.image) {
      user.profileImage = await uploadFile(
        config.get("user_images_dir"),
        req.body.image
      );
    }
    user = await UserDAO.update(user);
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
    user = await UserDAO.getByIdSync(req.user.id);
    user.mobileNumber = smsToken.mobileNumber;
    user = await UserDAO.update(user);
    return res.json({ success: true, user });
  }
);

// return user profile information
router.get(
  "/profile",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    user = await UserDAO.getByIdSync(req.user.id);
    return res.json({ success: true, user });
  }
);

// return users registred by user referral code (Invited by user)
router.get(
  "/referrals",
  [passport.authenticate("jwt", { session: false }), i18n],
  async (req, res, next) => {
    referrals = await UserDAO.getReferrals(req.user.code);
    res.json({ success: true, referrals });
  }
);

module.exports = router;
