const soap = require("soap");
const config = require("config");

module.exports.sendSMS = async function(mobileNumber, message) {
  let username = config.get("sms_user");
  let password = config.get("sms_password");
  let url = config.get("sms_wsdl_url");
  let senderNumber = config.get("sms_number");
  client = await soap.createClientAsync(url);
  let args = {
    username: username,
    password: password,
    _SenderNumber: senderNumber,
    _RecipientNumber: mobileNumber,
    _MessageText: message
  };
  res = await client.SendSingleMessageAsync(args);
  console.log(res);
};
