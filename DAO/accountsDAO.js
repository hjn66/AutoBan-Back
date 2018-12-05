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

module.exports.addAccountByEmail = async function(email, password) {
  if (!email) {
    throw new Error("Email required");
  }
  account = await Account.findOne({ where: { email: email } });
  if (account) {
    throw new Error("Email registerd before");
  }
  salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  return await Account.create({ email: email, password: password, loginType: "EMAIL" });
};

module.exports.addAccountByMobile = async function(mobileNumber, password) {
  if (!mobileNumber) {
    throw new Error("MobileNumber required");
  }
  account = await Account.findOne({ where: { mobileNumber: mobileNumber } });
  if (account) {
    throw new Error("mobileNumber registerd before");
  }
  salt = bcrypt.genSaltSync(10);
  password = bcrypt.hashSync(password, salt);
  return await Account.create({ mobileNumber: mobileNumber, password: password, loginType: "MOBILE" });
};

module.exports.getAccount = async function(username) {
  if (!username) {
    throw new Error("UserName required");
  }
  account = await Account.findOne({ where: { [Op.or]: [{ mobileNumber: username }, { email: username }] } });
  if (!account) {
    throw new Error("Account not found");
  }
  return account;
};

module.exports.comparePassword = async function(candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};
