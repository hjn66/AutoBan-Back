module.exports = (sequelize, Sequelize) => {
  return sequelize.define("periodic_service", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: { type: Sequelize.STRING }
  });
};
