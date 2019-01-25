module.exports = (sequelize, Sequelize) => {
  return sequelize.define("periodic_service", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    garageName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    image: { type: Sequelize.STRING, allowNull: true }
  });
};
