module.exports.assessCondition = async function(
  userId,
  assessFunction,
  period,
  op,
  value
) {
  let result = true;
  let count = await assessFunction(userId, period);
  switch (op) {
    case ">":
      result = count > value;
      break;
    case ">=":
      result = count >= value;
      break;
    case "<":
      result = count < value;
      break;
    case "<=":
      result = count <= value;
      break;
    case "=":
    case "==":
      result = count == value;
      break;
    default:
      break;
  }
  return result;
};
