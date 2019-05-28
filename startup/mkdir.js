const fs = require("fs-extra");
const path = require("path");
const config = require("config");

module.exports = function() {
  mkdirIfNotExist(path.join(rootPath, config.get("logs_dir")));
  mkdirIfNotExist(path.join(rootPath, config.get("uploads_dir")));
  mkdirIfNotExist(path.join(rootPath, config.get("user_images_dir")));
  mkdirIfNotExist(path.join(rootPath, config.get("car_images_dir")));
  mkdirIfNotExist(path.join(rootPath, config.get("receipt_images_dir")));
  mkdirIfNotExist(path.join(rootPath, config.get("blog_images_dir")));
};

mkdirIfNotExist = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};
