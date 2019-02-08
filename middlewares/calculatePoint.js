const rules = rootRequire("config/pointRules");

module.exports = async function(req, res, next) {
  let affectedRules = rules[req.originalUrl] || [];
  for (let index = 0; index < affectedRules.length; index++) {
    let userId = req.user.id;
    let rule = affectedRules[index];
    if (rule.userField) {
      userId = req[rule.userField];
    }
    if (userId) {
      await DAOs.UserDAO.addPoint(userId, rule.point);
      await DAOs.PointDAO.add(userId, req.originalUrl, rule.reason, rule.point);
    }
  }
};
