const randToken = require("rand-token");
const fs = require("fs-extra");
const path = require("path");

module.exports = async function(folderPath, content, realname) {
  let raw = randToken.generate(16);
  let fileName = Date.now() + raw.toString("hex");
  if (realname) {
    filename += path.extname(realname);
  }
  let buf = Buffer.from(content, "base64");
  console.log(buf);
  let filePath = path.join(folderPath, fileName);
  await fs.writeFileSync(filePath, buf);
  return filePath;
};
