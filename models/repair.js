module.exports = (sequelize, Sequelize) => {
  return sequelize.define('repair', {
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
    garageName: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};
