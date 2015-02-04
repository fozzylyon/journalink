var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

exports.setup = function (config) {
  passport.use(new FacebookStrategy({
      clientID: config.facebook.clientID,
      clientSecret: config.facebook.clientSecret,
      callbackURL: config.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      done(null, {});
      // User.findOne({
      //   'facebook.id': profile.id
      // },
      // function(err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     // user = new User({
      //     //   name: profile.displayName,
      //     //   email: profile.emails[0].value,
      //     //   role: 'user',
      //     //   username: profile.username,
      //     //   provider: 'facebook',
      //     //   facebook: profile._json
      //     // });
      //     // user.save(function(err) {
      //     //   if (err) done(err);
      //     //   return done(err, user);
      //     // });
      //   } else {
      //     return done(err, user);
      //   }
      // })
    }
  ));
};