module.exports = (sequelize, Sequelize) => {
  return sequelize.define("account", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    loginType: { type: Sequelize.ENUM("EMAIL", "MOBILE"), allowNull: false },
    password: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING, allowNull: true, unique: true, validate: { isEmail: true } },
    mobileNumber: { type: Sequelize.STRING, allowNull: true, unique: true, validate: { len: [10, 13], is: /^[+0-9]+$/i } },
    enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true }
  });
};
