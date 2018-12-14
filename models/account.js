module.exports = (sequelize, Sequelize) => {
  return sequelize.define("account", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    password: { type: Sequelize.STRING },
    mobileNumber: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { len: [10, 13], is: /^[+0-9]+$/i } },
    enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
  });
};
