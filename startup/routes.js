const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const path = require("path");
require("express-async-errors");

const cars = require("../routes/cars");

module.exports = async function(app) {
  // CORS Middleware
  app.use(cors());

  // Set Static Folder
  app.use(express.static(path.join(__dirname, "/../public")));
  app.use(express.static(path.join(__dirname, "/../uploads")));

  // Body Parser Middleware
  app.use(bodyParser.json());

  app.use("/cars", cars);
};
