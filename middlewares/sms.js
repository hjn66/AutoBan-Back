var soap = require("soap");
const config = require("config");

module.exports.sendSMS = async function(mobileNumber, message) {
  var username = config.get("sms_user");
  var password = config.get("sms_password");
  var url = config.get("sms_wsdl_url");
  var senderNumber = config.get("sms_number");
  client = await soap.createClientAsync(url);
  var args = {
    username: username,
    password: password,
    _SenderNumber: senderNumber,
    _RecipientNumber: mobileNumber,
    _MessageText: message
  };
  res = await client.SendSingleMessageAsync(args);
  console.log(res);
};
