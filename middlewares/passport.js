const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("config");
const UserDAO = require("../DAO/userDAO");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.get("JWTsecret");
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      if (jwt_payload.type == "SMS") {
        return done(null, jwt_payload.mobileNumber);
      }
      UserDAO.getUserById(jwt_payload.user.id, (err, user) => {
        if (err) {
          return done(new Error(err), null);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, null);
        }
      });
    })
  );
};
