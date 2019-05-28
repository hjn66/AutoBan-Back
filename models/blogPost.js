module.exports = (sequelize, Sequelize) => {
  return sequelize.define("blog_post", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    subject: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [3, 100] }
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [100, 2000] }
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { is: /^[a-zA-Z0-9\.\\\/]+$/i }
    }
  });
};
