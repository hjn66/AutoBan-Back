module.exports = (sequelize, Sequelize) => {
  return sequelize.define("car", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    plate: { type: Sequelize.STRING, allowNull: true, validate: { len: [11, 13] /*, is: /^[\u0600-\u06FF]+$/i*/ } },
    image: { type: Sequelize.STRING, allowNull: false, validate: { is: /^[a-zA-Z0-9\.\\\/]+$/i } },
    bulityear: { type: Sequelize.INTEGER, allowNull: false },
    odometer: { type: Sequelize.INTEGER }
  });
};
