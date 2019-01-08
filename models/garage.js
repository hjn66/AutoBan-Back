module.exports = (sequelize, Sequelize) => {
  return sequelize.define('repair', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
      validate: { len: [10, 13], is: /^[+0-9]+$/i }
    },
    latitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 }
    },
    longitude: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 }
    }
  });
};
