const rules = rootRequire("config/pointRules");
const pointUtils = rootRequire("middlewares/pointUtils");

module.exports = async function(req, res, next) {
  let affectedRules = rules[req.originalUrl] || [];
  for (let index = 0; index < affectedRules.length; index++) {
    let userId = req.user.id;
    let rule = affectedRules[index];
    if (rule.userField) {
      userId = req[rule.userField];
    }
    if (userId) {
      let ruleCondition = true;
      if (rule.condition) {
        ruleCondition = await pointUtils.assessCondition(
          userId,
          rule.condition.function,
          rule.condition.period,
          rule.condition.op,
          rule.condition.value
        );
        console.log(`ruleCondition: ${ruleCondition}`);
      }
      if (ruleCondition) {
        await DAOs.UserDAO.addPoint(userId, rule.point);
        await DAOs.PointDAO.add(
          userId,
          req.originalUrl,
          __(rule.reason),
          rule.point
        );
      }
    }
  }
};
