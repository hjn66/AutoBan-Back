module.exports = (sequelize, Sequelize) => {
  return sequelize.define('receipt_service', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    count: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 },
    cost: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 }
  });
};
