module.exports = (sequelize, Sequelize) => {
  return sequelize.define("fine", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
