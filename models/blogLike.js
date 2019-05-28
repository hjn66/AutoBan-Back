module.exports = (sequelize, Sequelize) => {
  return sequelize.define("blog_like", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
