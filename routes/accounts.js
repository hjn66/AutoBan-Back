const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");

const i18n = require("../middlewares/i18n");
const sms = require("../middlewares/sms");
const AccountDAO = require("../DAO/accountDAO");
const SMSTokenDAO = require("../DAO/smsTokenDAO");

// get mobileNumber in body and return token
router.post("/get-sms-token", i18n, async (req, res, next) => {
  const mobileNumber = req.body.mobileNumber;
  token = await SMSTokenDAO.getToken(mobileNumber);
  // await sms.sendSMS(mobileNumber, __("Your verification code to AutoBanApp is : %i", token.token));
  // res.json({ success: true, message: __("Verification code sent") });
  res.json({ success: true, token: token });
});

// get token and mobileNumber in body and check token is valid and return jwt token for register or login
router.post("/check-sms-token", i18n, async (req, res, next) => {
  smsToken = await SMSTokenDAO.checkToken(req.body);
  const token = jwt.sign({ type: "SMS", mobileNumber: smsToken.mobileNumber }, config.get("JWTsecret"), {
    expiresIn: config.get("jwt_sms_token_exp_sec")
  });
  return res.json({
    success: true,
    token: "JWT " + token
  });
});

// Authenticate with username(mobileNumber or email) and password
router.post("/authenticate-password", i18n, async (req, res, next) => {
  account = await AccountDAO.getAccount(req.body.username);
  if (!account.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }
  isMatch = await AccountDAO.comparePassword(req.body.password, account.password);
  if (isMatch) {
    account["password"] = "***";
    const token = jwt.sign({ type: "AUTH", account: account }, config.get("JWTsecret"));
    return res.json({
      success: true,
      token: "JWT " + token,
      account: account
    });
  } else {
    throw new Error("Wrong Password");
  }
});

// Authenticate by token returend by /check-sms-token
router.get("/authenticate-token", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  account = await AccountDAO.getAccount(req.user);
  if (!account.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }
  account["password"] = "***";
  const token = jwt.sign({ type: "AUTH", account: account }, config.get("JWTsecret"));
  return res.json({
    success: true,
    token: "JWT " + token,
    account: account
  });
});

module.exports = router;
