module.exports = (sequelize, Sequelize) => {
    return sequelize.define("car_model", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      englishName: { type: Sequelize.STRING, allowNull: true },
      persianName: { type: Sequelize.STRING, allowNull: true },
    });
  };
  