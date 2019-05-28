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

module.exports.add = async function(creatorId, subject, content, image) {
  if (!image || image == "") {
    image = config.get("default_blog_image");
  }
  console.log(image);
  return await BlogPost.create({
    creatorId,
    subject,
    content,
    image
  });
};

module.exports.update = async function(post) {
  return await post.save();
};

module.exports.remove = async function(post) {
  return await post.destroy();
};
