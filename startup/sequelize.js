const Sequelize = require("sequelize");
const UserModel = require("../models/user");
const SMSTokenModel = require("../models/smsToken");
const CarModelModel = require("../models/carModel");
const CarBrandModel = require("../models/carBrand");
const UserCarModel = require("../models/car");
const ColorModel = require("../models/color");
const CostModel = require("../models/cost");
const FuelModel = require("../models/fuel");
const FineModel = require("../models/fine");
const FineCategoryModel = require("../models/fineCategory");
const PeriodicCostModel = require("../models/periodicCost");
const PartModel = require("../models/part");
const PartCategoryModel = require("../models/partCategory");
const RepairModel = require("../models/repair");
const GarageModel = require("../models/garage");
const ReceiptModel = require("../models/receipt");
const ReceiptPartModel = require("../models/receiptPart");
const CarServiceModel = require("../models/carService");
const ReceiptServiceModel = require("../models/receiptService");

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

const User = UserModel(sequelize, Sequelize);
const SMSToken = SMSTokenModel(sequelize, Sequelize);
const CarModel = CarModelModel(sequelize, Sequelize);
const CarBrand = CarBrandModel(sequelize, Sequelize);
const Car = UserCarModel(sequelize, Sequelize);
const Color = ColorModel(sequelize, Sequelize);
const Cost = CostModel(sequelize, Sequelize);
const Fuel = FuelModel(sequelize, Sequelize);
const FineCategory = FineCategoryModel(sequelize, Sequelize);
const Fine = FineModel(sequelize, Sequelize);
const PeriodicCost = PeriodicCostModel(sequelize, Sequelize);
const Part = PartModel(sequelize, Sequelize);
const PartCategory = PartCategoryModel(sequelize, Sequelize);
const Repair = RepairModel(sequelize, Sequelize);
const Garage = GarageModel(sequelize, Sequelize);
const Receipt = ReceiptModel(sequelize, Sequelize);
const CarService = CarServiceModel(sequelize, Sequelize);
const ReceiptPart = ReceiptPartModel(sequelize, Sequelize);
const ReceiptService = ReceiptServiceModel(sequelize, Sequelize);

CarBrand.hasMany(CarModel, { as: "models" });
Car.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });
Car.belongsTo(CarModel, { foreignKey: { name: "modelId", allowNull: false } });
Car.belongsTo(Color, { foreignKey: { allowNull: false } });
Cost.belongsTo(Car, { foreignKey: { allowNull: false } });
Fuel.belongsTo(Cost, { foreignKey: { allowNull: false }, onDelete: "cascade" });
Fine.belongsTo(Cost, { foreignKey: { allowNull: false }, onDelete: "cascade" });
Fine.belongsTo(FineCategory, { foreignKey: { allowNull: false } });
PeriodicCost.belongsTo(Cost, { foreignKey: { allowNull: false }, onDelete: "cascade" });
Part.belongsTo(PartCategory, {
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "cascade"
});
Repair.belongsTo(User, {
  foreignKey: { name: "creatorId", allowNull: false }
});
Repair.belongsTo(Car, {
  foreignKey: { name: "carId", allowNull: false }
});
Repair.belongsTo(Garage, { foreignKey: { name: "garageId" } });
Garage.belongsTo(User, { foreignKey: { name: "ownerId" } });
Receipt.belongsTo(Repair, {
  foreignKey: { name: "repairId", allowNull: false },
  onDelete: "cascade"
});
ReceiptPart.belongsTo(Receipt, {
  foreignKey: { name: "receiptId", allowNull: false },
  onDelete: "cascade"
});
ReceiptPart.belongsTo(Part, {
  foreignKey: { name: "partId", allowNull: false }
});
ReceiptService.belongsTo(Receipt, {
  foreignKey: { name: "receiptId", allowNull: false },
  onDelete: "cascade"
});
ReceiptService.belongsTo(CarService, {
  foreignKey: { name: "serviceId", allowNull: false }
});

let syncForce = config.get("db_sync_force");

sequelize.sync({ force: syncForce }).then(() => {
  console.log(`Database & tables created!`);
  if (syncForce) {
    console.log("Databse Sync Forced");
    require("./fineCategoryInit")(FineCategory);
    Color.create({ englishName: "green", persianName: "سبز", code: "00FF00" });
    Color.create({ englishName: "red", persianName: "قرمز", code: "FF0000" });
    Color.create({ englishName: "blue", persianName: "آبی", code: "0000FF" });
    require("./carModelInit")(CarModel, CarBrand);
  }
});

module.exports = {
  User,
  SMSToken,
  Color,
  CarModel,
  CarBrand,
  Car,
  Cost,
  Fuel,
  Fine,
  FineCategory,
  PeriodicCost,
  Part,
  PartCategory,
  Repair,
  Garage,
  Receipt,
  ReceiptPart,
  CarService,
  ReceiptService
};
