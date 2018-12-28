module.exports = (sequelize, Sequelize) => {
  return sequelize.define("fine_category", {
    code: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    title: { type: Sequelize.STRING, allowNull: false }
  });
};
