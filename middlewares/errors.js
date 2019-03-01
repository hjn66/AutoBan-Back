const winston = require("winston");

module.exports = function(err, req, res, next) {
  mobileNumber = "NOUSER";
  if (req.user) {
    mobileNumber = req.user.mobileNumber;
  } else if (req.body.mobileNumber) {
    mobileNumber = req.body.mobileNumber;
  }
  winston.error({
    message: err.message + " by " + mobileNumber + " on " + req.originalUrl,
    stack: err.stack
  });
  if (
    err instanceof ReferenceError ||
    err instanceof SyntaxError ||
    err instanceof TypeError
  ) {
    res.json({ success: false, message: __("Server error occurred") });
  } else {
    res.json({ success: false, message: __(err.message) });
  }
};
