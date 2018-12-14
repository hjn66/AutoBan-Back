const Account = require("../startup/sequelize").Account;
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getAccountById = function(id, callback) {
  Account.findByPk(id).then(account => {
    if (!account) {
      callback("Account Not Found", account);
    }
    callback(null, account);
  });
};

module.exports.addAccount = async function(mobileNumber, password, accountType) {
  if (!mobileNumber) {
    throw new Error("MobileNumber required");
  }
  account = await Account.findOne({ where: { mobileNumber: mobileNumber } });
  if (account) {
    throw new Error("MobileNumber registered before");
  }
  salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  return await Account.create({ mobileNumber: mobileNumber, password: password, accountType: accountType });
};

module.exports.getAccount = async function(username) {
  if (!username) {
    throw new Error("UserName required");
  }
  account = await Account.findOne({ where: { mobileNumber: username } });
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

module.exports.comparePassword = async function(candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};
