module.exports.addminutes = async function(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports.subMinutes = async function(date, minutes) {
  return new Date(date.getTime() - minutes * 60000);
};

module.exports.addDays = async function(date, days) {
  return new Date(date.getTime() + days * 60000 * 60 * 24);
};

module.exports.subDays = async function(date, days) {
  return new Date(date.getTime() - days * 60000 * 60 * 24);
};

module.exports.internationalMobile = async function(mobileNumber) {
  if (mobileNumber.charAt(0) == "+") {
    return mobileNumber;
  }
  if (mobileNumber.charAt(0) == "0") {
    return "+98" + mobileNumber.substring(1, mobileNumber.length);
  }
  return "+98" + mobileNumber;
};
