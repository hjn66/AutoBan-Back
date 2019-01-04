module.exports = (sequelize, Sequelize) => {
  return sequelize.define("part_category", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    englishName: { type: Sequelize.STRING, allowNull: true },
    persianName: { type: Sequelize.STRING, allowNull: false, unique: true }
  });
};
