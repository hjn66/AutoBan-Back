module.exports = (sequelize, Sequelize) => {
  return sequelize.define('car_service', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    persianName: { type: Sequelize.STRING, allowNull: false, unique: true },
    englishName: { type: Sequelize.STRING, allowNull: true }
  });
};
