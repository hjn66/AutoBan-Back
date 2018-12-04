const express = require("express");
const path = require("path");
const config = require("config");
const errors = require("./middlewares/errors");

var app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/i18n");

const port = config.get("port");

process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

app.use(errors);

app.listen(port, () => {
  console.log("Server started on " + port);
});
