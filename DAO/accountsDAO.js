const Account = require("../startup/sequelize").Account;
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.addAccount = async function(newAccount) {
  if (!newAccount.email && !newAccount.mobileNumber) {
    throw new Error("Email Or Mobile Number Required");
  }
  account = await Account.findOne({ where: { email: newAccount.email } });
  if (account) {
    throw new Error("Email Registerd Before");
  }
  account = await Account.findOne({ where: { mobileNumber: newAccount.mobileNumber } });
  if (account) {
    throw new Error("mobileNumber Registerd Before");
  }
  salt = await bcrypt.genSalt(10);
  newAccount.password = await bcrypt.hash(newAccount.password, salt);
  return await Account.create(newAccount);
};

module.exports.getAccount = async function(username) {
  account = await Account.findOne({ where: { [Op.or]: [{ mobileNumber: username }, { email: username }] } });
  if (!account) {
    throw new Error("User Not Found");
  }
  return account;
};
