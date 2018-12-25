module.exports = (sequelize, Sequelize) => {
  return sequelize.define("cost", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: { type: Sequelize.STRING, allowNull: false },
    date: { type: Sequelize.DATE, allowNull: false },
    value: { type: Sequelize.INTEGER, allowNull: false },
    comment: { type: Sequelize.STRING, allowNull: true }
  });
};
