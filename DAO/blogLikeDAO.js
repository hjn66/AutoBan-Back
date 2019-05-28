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
