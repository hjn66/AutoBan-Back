module.exports = (sequelize, Sequelize) => {
  return sequelize.define("periodic_cost", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, //Period on months -- default = 12months = yearly
    period: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 12
    },
    type: {
      type: Sequelize.ENUM("LOAN", "BODY_INSURANCE", "THIRD_PARTY_INSURANCE", "DIAGNOSIS", "OTHER"),
      allowNull: false,
      defaultValue: "OTHER"
    }
  });
};
