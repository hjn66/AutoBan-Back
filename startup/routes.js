const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");
const passport = require("passport");
require("express-async-errors");

const users = require("../routes/users");
const cars = require("../routes/cars");
const costs = require("../routes/costs");
const repairs = require("../routes/repairs");
const periodcServices = require("../routes/periodcServices");

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

  require("../middlewares/passport")(passport);

  app.use("/users", users);
  app.use("/cars", cars);
  app.use("/costs", costs);
  app.use("/repairs", repairs);
  app.use("/periodic-services", periodcServices);
};
