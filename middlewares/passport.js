const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");
const AccountDAO = require("../DAO/accountsDAO");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.get("JWTsecret");
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.type == "SMS") {
        return done(null, jwt_payload.mobileNumber);
      }
      AccountDAO.getAccountById(jwt_payload.account.id, (err, account) => {
        if (err) {
          return done(err, false);
        }
        if (account) {
          return done(null, account);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
