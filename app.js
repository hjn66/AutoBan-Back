const express = require("express");
const path = require("path");
const config = require("config");

var app = express();
require("./startup/logging")();
require("./startup/db");
require("./startup/routes")(app);

const port = config.get("port");

process.env.NODE_CONFIG_DIR = path.join(__dirname, "./config");

app.listen(port, () => {
  console.log("Server started on " + port);
});
