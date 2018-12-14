const Sequelize = require("sequelize");
const AccountModel = require("../models/account");
const AccountTypeModel = require("../models/accountType");
const UserModel = require("../models/user");
const SMSTokenModel = require("../models/smsToken");
const carModelModel = require("../models/carModel");
const CarBrandModel = require("../models/carBrand");
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
const AccountType = AccountTypeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const SMSToken = SMSTokenModel(sequelize, Sequelize);
const CarModel = carModelModel(sequelize, Sequelize);
const CarBrand = CarBrandModel(sequelize, Sequelize);
// const User = UserModel(sequelize, Sequelize);
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
// const BlogTag = sequelize.define("blog_tag", {});
// const Blog = BlogModel(sequelize, Sequelize);
// const Tag = TagModel(sequelize, Sequelize);

// Blog.belongsToMany(Tag, { through: BlogTag, unique: false });
// Tag.belongsToMany(Blog, { through: BlogTag, unique: false });

Account.belongsTo(AccountType, { foreignKey: { name: "accountType", allowNull: false } });
User.belongsTo(Account, { foreignKey: { name: "accountId", allowNull: false } });
CarBrand.hasMany(CarModel, { as: "models" });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
  // AccountType.create({ type: "User" });
  // require("./carModelInit")(CarModel, CarBrand);
});

// AccountType.create({ type: "User" }).then(accountType => {
//   console.log(accountType); // John Doe (SENIOR ENGINEER)
// });

module.exports = {
  Account,
  User,
  SMSToken
};
