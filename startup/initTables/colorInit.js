const readXlsxFile = require("read-excel-file/node");
const path = require("path");

const ColorDAO = require("../../DAO/colorDAO");
let filePath = path.join(rootPath, "startup/initTables/colors.xlsx");

module.exports = async () => {
  let rows = await readXlsxFile(filePath);
  for (let i = 1; i < rows.length; i++) {
    let persianName = rows[i][0];
    let englishName = rows[i][1];
    let code = rows[i][2];
    try {
      let color = await ColorDAO.getByName(persianName);
      color.code = code;
      color.englishName = englishName;
      ColorDAO.update(color);
    } catch (ex) {
      await ColorDAO.add(persianName, englishName, code);
    }
  }
};
