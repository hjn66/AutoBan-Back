const passport = require("passport");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const i18n = require("../middlewares/i18n");
const AccountDAO = require("../DAO/accountsDAO");

router.post("/register", i18n, async (req, res, next) => {
  account = await AccountDAO.addAccount(req.body);
  res.json(account);
});

//Authenticate
router.post("/authenticate", i18n, async (req, res, next) => {
  const email = req.body.email;
  var mobileNumber = req.body.mobileNumber;
  const password = req.body.password;

  account = await AccountDAO.getAccount(req.body.username);
  res.json(account);
  //   if (!account.emailVerified) {
  //     throw new Error("Email not verified, go to your mailbox and click on verification link");
  //   }
  if (!account.enabled) {
    throw new Error("Your Account dissabled by admin, please contact to admin");
  }

  //   isMatch = await Account.comparePassword(password, account.password);
  //   if (isMatch) {
  //     const token = jwt.sign(account.toJSON(), config.get("JWTsecret"), {
  //       expiresIn: 604800 // 1 week in sec
  //     });
  //     Log(req, "User authenticated successfuly", email);
  //     account["password"] = "***";
  //     return res.json({
  //       success: true,
  //       token: "JWT " + token,
  //       account: account
  //     });
  //   } else {
  //     throw new Error("Wrong Password");
  //   }
});

module.exports = router;
