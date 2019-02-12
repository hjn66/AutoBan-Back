module.exports.addMinute = function(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
};

module.exports.subMinute = function(date, minutes) {
  return new Date(date.getTime() - minutes * 60000);
};

module.exports.addHour = function(date, hours) {
  return new Date(date.getTime() + hours * 60000 * 60);
};

module.exports.subHour = function(date, hours) {
  return new Date(date.getTime() - hours * 60000 * 60);
};

module.exports.addDay = function(date, days) {
  return date.setDate(date.getDate() + days);
};

module.exports.subDay = function(date, days) {
  return date.setDate(date.getDate() - days);
};

module.exports.subYear = function(date, years) {
  return date.setYear(date.getFullYear() - years);
};

module.exports.addYear = function(date, years) {
  return date.setYear(date.getFullYear() + years);
};

module.exports.subMonth = function(date, months) {
  return date.setMonth(date.getMonth() - months);
};

module.exports.addMonth = function(date, months) {
  return date.setMonth(date.getMonth() + months);
};

module.exports.subPeriod = function(date, period) {
  switch (period.substring(0, 1)) {
    case "d":
    case "D":
      return this.subDay(date, parseInt(period.substring(1, period.length)));
    case "M":
      return this.subMonth(date, parseInt(period.substring(1, period.length)));
    case "y":
    case "Y":
      return this.subYear(date, parseInt(period.substring(1, period.length)));
    case "m":
      return this.subMinute(date, parseInt(period.substring(1, period.length)));
    case "h":
    case "H":
      return this.subHour(date, parseInt(period.substring(1, period.length)));
    default:
      return date;
  }
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
