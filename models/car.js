module.exports = (sequelize, Sequelize) => {
  return sequelize.define("car", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: { type: Sequelize.STRING, allowNull: false },
    tag: { type: Sequelize.STRING, allowNull: true, validate: { len: [8, 10], is: /^[\u0600-\u06FF]+$/i } },
    image: { type: Sequelize.STRING, allowNull: true, validate: { is: /^[a-zA-Z0-9\.\\\/]+$/i } },
    odometer: { type: Sequelize.INTEGER }
  });
};
