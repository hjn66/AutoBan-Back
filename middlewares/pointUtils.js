module.exports.assessCondition = async function(userId, condition) {
  let result = true;
  switch (condition.op) {
    case ">":
      result =
        (await condition.function(userId, condition.period)) > condition.value;
      break;
    case ">=":
      result =
        (await condition.function(userId, condition.period)) >= condition.value;
      break;
    case "<":
      result =
        (await condition.function(userId, condition.period)) < condition.value;
      break;
    case "<=":
      result =
        (await condition.function(userId, condition.period)) <= condition.value;
      break;
    case "=":
    case "==":
      result =
        (await condition.function(userId, condition.period)) == condition.value;
      break;
    default:
      break;
  }
  return result;
};
