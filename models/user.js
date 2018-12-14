module.exports = (sequelize, Sequelize) => {
  return sequelize.define("user", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: { type: Sequelize.STRING, allowNull: true, unique: true, validate: { isEmail: true } },
    firstName: { type: Sequelize.STRING, allowNull: false },
    lastName: { type: Sequelize.STRING, allowNull: false },
    profileImage: { type: Sequelize.STRING, allowNull: true }
  });
};
