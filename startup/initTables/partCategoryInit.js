module.exports = async PartCategory => {
  await PartCategory.create({
    persianName: "روغن موتور",
    englishName: "Engine Oil",
    checkPeriodic: true,
    unit: "لیتر"
  });
  await PartCategory.create({
    persianName: "فیلتر روغن",
    englishName: "Oil Filter",
    checkPeriodic: true
  });
  await PartCategory.create({
    persianName: "فیلتر هوا",
    englishName: "Air Filter",
    checkPeriodic: true
  });
  await PartCategory.create({
    persianName: "فیلتر کابین",
    englishName: "Cab Filter",
    checkPeriodic: true
  });
  await PartCategory.create({
    persianName: "فیلتر بنزین",
    englishName: "Gasoline Filter",
    checkPeriodic: true
  });
  await PartCategory.create({
    persianName: "روغن هیدرولیک",
    englishName: "Hydraulic Oil",
    checkPeriodic: true,
    unit: "لیتر"
  });
  await PartCategory.create({
    persianName: "روغن گیربکس",
    englishName: "Gearbox Oil",
    checkPeriodic: true,
    unit: "لیتر"
  });
  await PartCategory.create({
    persianName: "ضد یخ",
    englishName: "Antifreeze"
  });
};
