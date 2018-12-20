const Sequelize = require("sequelize");
const AccountModel = require("../models/account");
const AccountTypeModel = require("../models/accountType");
const UserModel = require("../models/user");
const SMSTokenModel = require("../models/smsToken");
const CarModelModel = require("../models/carModel");
const CarBrandModel = require("../models/carBrand");
const UserCarModel = require("../models/car");
const ColorModel = require("../models/color");
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
const CarModel = CarModelModel(sequelize, Sequelize);
const CarBrand = CarBrandModel(sequelize, Sequelize);
const Car = UserCarModel(sequelize, Sequelize);
const Color = ColorModel(sequelize, Sequelize);

Account.belongsTo(AccountType, { foreignKey: { name: "accountType", allowNull: false } });
User.belongsTo(Account, { foreignKey: { name: "accountId", allowNull: false } });
CarBrand.hasMany(CarModel, { as: "models" });
User.belongsToMany(CarModel, { through: Car, foreignKey: { name: "userId", allowNull: false } });
CarModel.belongsToMany(User, { through: Car, foreignKey: { name: "modelId", allowNull: false } });
Car.belongsTo(Color, { foreignKey: { allowNull: false } });

sequelize.sync({ force: false }).then(() => {
  console.log(`Database & tables created!`);
  // AccountType.create({ type: "User" });
  // Color.create({ englishName: "green", persianName: "سبز", code: "00FF00" });
  // Color.create({ englishName: "red", persianName: "قرمز", code: "FF0000" });
  // Color.create({ englishName: "blue", persianName: "آبی", code: "0000FF" });
  // require("./carModelInit")(CarModel, CarBrand);
});

module.exports = {
  Account,
  User,
  SMSToken,
  Color,
  CarModel,
  CarBrand,
  Car
};
