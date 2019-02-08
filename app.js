const express = require("express");
const path = require("path");
const config = require("config");
const errors = require("./middlewares/errors");
const sms = require("./middlewares/sms");

global.rootPath = __dirname;
global.rootRequire = name => require(path.join(__dirname, name));
global.DAOs = rootRequire("startup/DAOs");
process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

var app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/i18n");
require("./startup/mkdir")();

const port = config.get("port");

app.use(errors);

app.listen(port, () => {
  console.log("Server started on " + port);
});
