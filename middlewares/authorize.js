module.exports = function(authorizedUsers) {
  return function(req, res, next) {
    if (authorizedUsers.includes(req.user.type)) {
      next();
    } else {
      return res.sendStatus(401);
    }
  };
};
