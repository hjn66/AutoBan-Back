const passport = require("passport");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const config = require("config");

const i18n = require("../middlewares/i18n");
const AccountDAO = require("../DAO/accountsDAO");
const SMSTokenDAO = require("../DAO/smsTokenDAO");

// get mobileNumber in body and return token
router.post("/get-sms-token", i18n, async (req, res, next) => {
  token = await SMSTokenDAO.getToken(req.body.mobileNumber);
  res.json({ success: true, token: token });
});

// get token and mobileNumber in body and check token is valid and return jwt token for register or login
router.post("/check-sms-token", i18n, async (req, res, next) => {
  smsToken = await SMSTokenDAO.checkToken(req.body);
  const token = jwt.sign({ type: "SMS", token: smsToken }, config.get("JWTsecret"), {
    expiresIn: config.get("jwt_sms_token_exp_sec")
  });
  return res.json({
    success: true,
    token: "JWT " + token,
    smsToken: smsToken
  });
});

// register with password and token returned by check-sms-token
router.post("/register-mobile", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  account = await AccountDAO.addAccountByMobile(req.user.mobileNumber, req.body.password);
  res.json({ success: true, account: account });
});

// register with email and password
router.post("/register-email", i18n, async (req, res, next) => {
  account = await AccountDAO.addAccountByEmail(req.body.email, req.body.password);
  res.json({ success: true, account: account });
});

// Authenticate withe username(mobileNumber or email) and password
router.post("/authenticate-password", i18n, async (req, res, next) => {
  account = await AccountDAO.getAccount(req.body.username);
  if (!account.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }
  isMatch = await AccountDAO.comparePassword(req.body.password, account.password);
  if (isMatch) {
    const token = jwt.sign({ type: "AUTH", accountId: account.id }, config.get("JWTsecret"), {
      expiresIn: config.get("jwt_auth_exp_sec") // 90 days
    });
    account["password"] = "***";
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
  account = await AccountDAO.getAccount(req.user.mobileNumber);
  if (!account.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }
  const token = jwt.sign({ type: "AUTH", accountId: account.id }, config.get("JWTsecret"), {
    expiresIn: config.get("jwt_auth_exp_sec") // 90 days
  });
  account["password"] = "***";
  return res.json({
    success: true,
    token: "JWT " + token,
    account: account
  });
});

router.get("/profile", [passport.authenticate("jwt", { session: false }), i18n], async (req, res, next) => {
  return res.json({ user: req.user });
});

module.exports = router;
