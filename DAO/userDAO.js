const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const randToken = require("rand-token");
const config = require("config");

const User = rootRequire("startup/sequelize").User;
const Utils = rootRequire("middlewares/utils");
const Op = Sequelize.Op;

module.exports.getById = function(id, callback) {
  User.findByPk(id).then(user => {
    if (!user) {
      return callback("User not found", null);
    }
    return callback(null, user);
  });
};

module.exports.getByIdSync = async function(id) {
  user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports.add = async function(
  mobileNumber,
  password,
  type,
  firstName,
  lastName,
  email,
  profilePic,
  referral
) {
  if (!firstName || !lastName) {
    throw new Error("firstName and lastName required");
  }
  if (!mobileNumber) {
    throw new Error("MobileNumber required");
  }
  let user = await User.findOne({ where: { mobileNumber } });
  if (user) {
    throw new Error("MobileNumber registered before");
  }
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  let code = randToken.generate(config.get("user_code_length"));
  while (await this.getByCode(code)) {
    code = randToken.generate(config.get("user_code_length"));
  }
  return await User.create({
    mobileNumber,
    password: hash,
    type,
    firstName,
    lastName,
    email,
    profileImage: profilePic,
    code,
    referral
  });
};

module.exports.update = async function(user) {
  if (!user.firstName || !user.lastName) {
    throw new Error("firstName and lastName required");
  }
  return await user.save();
};

module.exports.comparePassword = async function(candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};

module.exports.getByUsername = async function(username) {
  if (!username) {
    throw new Error("UserName required");
  }
  let user = {};
  if (username.includes("@")) {
    user = await User.findOne({ where: { email: username } });
  } else {
    let mobileNumber = await Utils.internationalMobile(username);
    user = await User.findOne({ where: { mobileNumber } });
  }
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports.getByCode = async function(code) {
  return await User.findOne({ where: { code } });
};

module.exports.getReferrals = async function(code) {
  return await User.findAll({
    where: { referral: code },
    attributes: ["firstName", "lastName", "profileImage"]
  });
};
