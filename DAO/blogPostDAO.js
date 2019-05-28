const config = require("config");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const BlogPost = rootRequire("startup/sequelize").BlogPost;
const Utils = rootRequire("middlewares/utils");

module.exports.getById = async function(id) {
  post = await BlogPost.findByPk(id);
  if (!post) {
    throw new Error("Blog post not found");
  }
  return post;
};