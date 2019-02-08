const SMSToken = rootRequire("startup/sequelize").SMSToken;
const Sequelize = require("sequelize");
const randToken = require("rand-token");
const config = require("config");
const Utils = rootRequire("middlewares/utils");
const Op = Sequelize.Op;

// create new Token when not exists or expired
// return Token when Token exists and not expired
// also delete all expired Token from DB
module.exports.getToken = async function(mobileNumber) {
  SMSToken.destroy({ where: { expiredDate: { [Op.lt]: Date.now() } } });
  mobileNumber = await Utils.internationalMobile(mobileNumber);
  token = await SMSToken.findOne({ where: { mobileNumber: mobileNumber } });
  if (!token) {
    return await this.createToken(mobileNumber);
  }
  return token;
};

// generate random Token and save on DB
module.exports.createToken = async function(mobileNumber) {
  token = randToken.generate(config.get("sms_token_length"), "0123456789");
  expired = await Utils.addminutes(new Date(), config.get("sms_token_expiration_min"));
  return await SMSToken.create({ mobileNumber: mobileNumber, token: token, expiredDate: expired });
};

// generate random Token and save on DB
module.exports.checkToken = async function(token) {
  token.mobileNumber = await Utils.internationalMobile(token.mobileNumber);
  smsToken = await SMSToken.findOne({ where: { [Op.and]: [{ mobileNumber: token.mobileNumber }, { token: token.token }] } });
  if (smsToken) {
    if (smsToken.expiredDate < Date.now()) {
      throw new Error("Expired token");
    }
    return smsToken;
  }
  throw new Error("Invalid token");
};
