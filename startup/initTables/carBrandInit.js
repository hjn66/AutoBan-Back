const readXlsxFile = require("read-excel-file/node");
const path = require("path");

const CarBrandDAO = rootRequire("DAO/carBrandDAO");
let filePath = path.join(rootPath, "startup/initTables/carBrands.xlsx");

module.exports = async () => {
  let rows = await readXlsxFile(filePath);
  for (let i = 1; i < rows.length; i++) {
    let id = rows[i][0];
    let persianName = rows[i][1];
    let englishName = rows[i][2];
    let logo = rows[i][3] || "";
    try {
      let brand = await CarBrandDAO.getByName(persianName);
      brand.logo = logo;
      brand.englishName = englishName;
      CarBrandDAO.update(brand);
    } catch (ex) {
      await CarBrandDAO.add(id, persianName, englishName, logo);
    }
  }
};
