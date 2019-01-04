module.exports = (sequelize, Sequelize) => {
  return sequelize.define("part", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persianName: { type: Sequelize.STRING, allowNull: false },
    englishName: { type: Sequelize.STRING, allowNull: true },
    type: { type: Sequelize.STRING, allowNull: true },
    lifetimeKM: { type: Sequelize.INTEGER, allowNull: true },
    lifetimeMonths: { type: Sequelize.INTEGER, allowNull: true },
    country: { type: Sequelize.STRING, allowNull: true },
    manufacturer: { type: Sequelize.INTEGER, allowNull: true },
    SuitableFor: { type: Sequelize.STRING, allowNull: true }
  });
};
