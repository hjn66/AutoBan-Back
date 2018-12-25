module.exports = (sequelize, Sequelize) => {
  return sequelize.define("fuel", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    volume: { type: Sequelize.INTEGER, allowNull: false },
    type: { type: Sequelize.ENUM("NORMAL", "SUPER", "CNG", "LPG", "GAZOIL"), allowNull: false, defaultValue: "NORMAL" },
    odometer: { type: Sequelize.INTEGER, allowNull: true },
    isFull: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    stationName: { type: Sequelize.STRING, allowNull: true }
  });
};
