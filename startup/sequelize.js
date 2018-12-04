const Sequelize = require("sequelize");
const AccountModel = require("../models/account");
const config = require("config");

const sequelize = new Sequelize(config.get("db_database"), config.get("db_user"), config.get("db_password"), {
  dialect: "mysql",
  host: config.get("db_host"),
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false
});

const Account = AccountModel(sequelize, Sequelize);
// const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define("blog_tag", {});
// const Blog = BlogModel(sequelize, Sequelize);
// const Tag = TagModel(sequelize, Sequelize);

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false });
// Blog.belongsTo(User);
// User.belongsTo(Account);

sequelize.sync().then(() => {
  console.log(`Database & tables created!`);
});

module.exports = {
  Account
};
