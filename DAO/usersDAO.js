const User = require("../startup/sequelize").User;
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports.getUserById = async function(id) {
  user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports.addUser = async function(firstName, lastName, email, profilePic, accountId) {
  if (!firstName || !lastName) {
    throw new Error("firstName and lastName required");
  }
  return await User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    profileImage: profilePic,
    accountId: accountId
  });
};

module.exports.updateUser = async function(user) {
  if (!user.firstName || !user.lastName) {
    throw new Error("firstName and lastName required");
  }
  return await user.save();
};

module.exports.getUserByAccountId = async function(accountId) {
  user = await User.findOne({
    where: { accountId: accountId }
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
