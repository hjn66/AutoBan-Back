module.exports = (sequelize, Sequelize) => {
  return sequelize.define('receipt', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: { type: Sequelize.STRING, allowNull: false },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    totalCost: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    shopName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    image: { type: Sequelize.STRING, allowNull: true }
  });
};
