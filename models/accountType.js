module.exports = (sequelize, Sequelize) => {
  return sequelize.define("account_type", {
    type: { type: Sequelize.STRING, allowNull: false, primaryKey: true }
  });
};
