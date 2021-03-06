const Sequelize = require("sequelize");
const UserModel = rootRequire("models/user");
const SMSTokenModel = rootRequire("models/smsToken");
const CarModelModel = rootRequire("models/carModel");
const CarBrandModel = rootRequire("models/carBrand");
const UserCarModel = rootRequire("models/car");
const ColorModel = rootRequire("models/color");
const CostModel = rootRequire("models/cost");
const FuelModel = rootRequire("models/fuel");
const FineModel = rootRequire("models/fine");
const FineCategoryModel = rootRequire("models/fineCategory");
const PeriodicCostModel = rootRequire("models/periodicCost");
const PartModel = rootRequire("models/part");
const PartCategoryModel = rootRequire("models/partCategory");
const RepairModel = rootRequire("models/repair");
const GarageModel = rootRequire("models/garage");
const ReceiptModel = rootRequire("models/receipt");
const ReceiptPartModel = rootRequire("models/receiptPart");
const CarServiceModel = rootRequire("models/carService");
const ReceiptServiceModel = rootRequire("models/receiptService");
const PeriodicServiceModel = rootRequire("models/periodicService");
const PointModel = rootRequire("models/point");

const config = require("config");

const sequelize = new Sequelize(
  config.get("db_database"),
  config.get("db_user"),
  config.get("db_password"),
  {
    dialect: "mysql",
    host: config.get("db_host"),
    pool: {
      max: 20,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: false
  }
);

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
const PeriodicService = PeriodicServiceModel(sequelize, Sequelize);
const Points = PointModel(sequelize, Sequelize);

Points.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });
CarBrand.hasMany(CarModel, { as: "models" });
Car.belongsTo(User, { foreignKey: { name: "userId", allowNull: false } });
Car.belongsTo(CarModel, { foreignKey: { name: "modelId", allowNull: false } });
Car.belongsTo(Color, { foreignKey: { allowNull: false } });
Cost.belongsTo(Car, { foreignKey: { allowNull: false } });
Fuel.belongsTo(Cost, { foreignKey: { allowNull: false }, onDelete: "cascade" });
Fine.belongsTo(Cost, { foreignKey: { allowNull: false }, onDelete: "cascade" });
Fine.belongsTo(FineCategory, { foreignKey: { allowNull: true } });
PeriodicCost.belongsTo(Cost, {
  foreignKey: { allowNull: false },
  onDelete: "cascade"
});
Part.belongsTo(PartCategory, {
  foreignKey: { name: "categoryId", allowNull: false },
  onDelete: "cascade"
});
Repair.belongsTo(User, {
  foreignKey: { name: "creatorId", allowNull: false }
});
Repair.belongsTo(Car, {
  foreignKey: { name: "carId", allowNull: false, onDelete: "cascade" }
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

PeriodicService.belongsTo(Repair, {
  foreignKey: { name: "repairId", allowNull: false },
  onDelete: "cascade"
});
PeriodicService.belongsTo(PartCategory, {
  foreignKey: { name: "categoryId", allowNull: false }
});
PeriodicService.belongsTo(Part, {
  foreignKey: { name: "partId", allowNull: true }
});

let syncForce = config.get("db_sync_force");

sequelize.sync({ force: syncForce }).then(() => {
  console.log(`Database & tables created!`);
  require("./initTables/colorInit")();
  require("./initTables/carBrandInit")();
  if (syncForce) {
    console.log("Databse Sync Forced");
    require("./initTables/fineCategoryInit")(FineCategory);
    Color.create({ englishName: "green", persianName: "سبز", code: "00FF00" });
    Color.create({ englishName: "red", persianName: "قرمز", code: "FF0000" });
    Color.create({ englishName: "blue", persianName: "آبی", code: "0000FF" });
    require("./initTables/carModelInit")(CarModel, CarBrand);
    require("./initTables/partCategoryInit")(PartCategory);
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
  ReceiptService,
  PeriodicService,
  Points
};
