module.exports = (sequelize, Sequelize) => {
  return sequelize.define("color", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    englishName: { type: Sequelize.STRING, allowNull: true },
    persianName: { type: Sequelize.STRING, allowNull: true },
    code: { type: Sequelize.STRING, allowNull: true, validate: { len: [6, 6], is: /^[A-F0-9]+$/i } }
  });
};
