module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    mobileNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [10, 13], is: /^[+0-9]+$/i }
    },
    password: { type: Sequelize.STRING },
    enabled: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
    type: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true }
    },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    profileImage: { type: Sequelize.STRING, allowNull: true },
    code: {
      type: Sequelize.STRING(6),
      allowNull: false,
      unique: true,
      set(val) {
        this.setDataValue("code", val.toUpperCase());
      }
    },
    referral: {
      type: Sequelize.STRING(6),
      allowNull: true,
      set(val) {
        if (val) {
          this.setDataValue("referral", val.toUpperCase());
        }
      }
    },
    point: { type: Sequelize.INTEGER, defaultValue: 0 }
  });
};
