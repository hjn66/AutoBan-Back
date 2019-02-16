const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");
const passport = require("passport");
require("express-async-errors");

const users = rootRequire("routes/users");
const cars = rootRequire("routes/cars");
const costs = rootRequire("routes/costs");
const repairs = rootRequire("routes/repairs");
const periodcServices = rootRequire("routes/periodcServices");
const server = rootRequire("routes/server");
const calculatePoint = rootRequire("middlewares/calculatePoint");

module.exports = async function(app) {
  // CORS Middleware
  app.use(cors());

  // Set Static Folder
  app.use(express.static(path.join(rootPath, "public")));
  app.use("/uploads", express.static(path.join(rootPath, "uploads")));

  // Body Parser Middleware
  // app.use(bodyParser.json());
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  rootRequire("middlewares/passport")(passport);

  app.use("/users", users);
  app.use("/cars", cars);
  app.use("/costs", costs);
  app.use("/repairs", repairs);
  app.use("/periodic-services", periodcServices);
  app.use("/server", server);
  app.use(calculatePoint);
};
