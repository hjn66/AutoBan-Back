const rules = rootRequire("config/pointRules");
const pointUtils = rootRequire("middlewares/pointUtils");

module.exports = async function(req, res, next) {
  let affectedRules = rules[req.originalUrl] || [];
  for (let index = 0; index < affectedRules.length; index++) {
    let rule = affectedRules[index];
    if (rule.point < 0) {
      if (req.user.id) {
        let ruleCondition = true;
        if (rule.condition) {
          ruleCondition = await pointUtils.assessCondition(
            req.user.id,
            rule.condition.function,
            rule.condition.period,
            rule.condition.op,
            rule.condition.value - 1
          );
        }
        if (ruleCondition && rule.point + req.user.point < 0) {
          throw new Error("You have'nt sufficient point for this action");
        }
      }
    }
  }
  next();
};
