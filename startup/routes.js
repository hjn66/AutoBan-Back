const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");
const passport = require("passport");
require("express-async-errors");

const accounts = require("../routes/accounts");
const users = require("../routes/users");
const cars = require("../routes/cars");

module.exports = async function(app) {
  // CORS Middleware
  app.use(cors());

  // Set Static Folder
  app.use(express.static(path.join(__dirname, "/../public")));
  app.use(express.static(path.join(__dirname, "/../uploads")));

  // Body Parser Middleware
  app.use(bodyParser.json());

  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());

  require("../middlewares/passport")(passport);

  app.use("/accounts", accounts);
  app.use("/users", users);
  app.use("/cars", cars);
};
