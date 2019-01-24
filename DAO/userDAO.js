const User = require("../startup/sequelize").User;
const bcrypt = require("bcryptjs");
const Utils = require("../middlewares/utils");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getUserById = function(id, callback) {
  User.findByPk(id).then(user => {
    if (!user) {
      return callback("User not found", null);
    }
    return callback(null, user);
  });
};

module.exports.getUserByIdSync = async function(id) {
  user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports.addUser = async function(
  mobileNumber,
  password,
  type,
  firstName,
  lastName,
  email,
  profilePic
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
  return await User.create({
    mobileNumber,
    password: hash,
    type,
    firstName,
    lastName,
    email,
    profileImage: profilePic
  });
};

module.exports.updateUser = async function(user) {
  if (!user.firstName || !user.lastName) {
    throw new Error("firstName and lastName required");
  }
  return await user.save();
};

module.exports.comparePassword = async function(candidatePassword, hash) {
  return await bcrypt.compare(candidatePassword, hash);
};

module.exports.getUser = async function(username) {
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
