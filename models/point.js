module.exports = (sequelize, Sequelize) => {
  return sequelize.define("point", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: { type: Sequelize.STRING, allowNull: false },
    reason: { type: Sequelize.STRING, allowNull: false },
    point: { type: Sequelize.INTEGER, defaultValue: 0 },
    objectId: { type: Sequelize.INTEGER, allowNull: true }
  });
};
