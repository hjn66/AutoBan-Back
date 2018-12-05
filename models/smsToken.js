module.exports = (sequelize, Sequelize) => {
  return sequelize.define("sms_token", {
    mobileNumber: { type: Sequelize.STRING, allowNull: false, primaryKey: true, validate: { len: [10, 13], is: /^\+?[0-9]+$/i } },
    token: { type: Sequelize.STRING, allowNull: false, validate: { len: [6, 6], is: /^[0-9]+$/i } },
    expiredDate: { type: Sequelize.DATE, allowNull: false }
  });
};
