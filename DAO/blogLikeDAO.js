const Sequelize = require("sequelize");

const BlogLike = rootRequire("startup/sequelize").BlogLike;

module.exports.like = async function(userId, blogPostId) {
  let like = await BlogLike.findOne({
    where: { userId, blogId: blogPostId }
  });
  if (like) {
    throw new Error("You like this blog post before");
  }
  return await BlogLike.create({
    userId,
    blogId: blogPostId
  });
};

module.exports.unlike = async function(userId, blogPostId) {
  let like = await BlogLike.findOne({
    where: { userId, blogId: blogPostId }
  });
  if (!like) {
    throw new Error("You must like a post before unlike");
  }
  return await like.destroy();
};

module.exports.list = async function(blogId) {
  let likes = await BlogLike.findAll({
    where: { blogId }
  });
  return likes;
};

module.exports.count = async function(blogId) {
  result = await BlogLike.findOne({
    where: { blogId },
    attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "count"]]
  });
  return await result.dataValues.count;
};
