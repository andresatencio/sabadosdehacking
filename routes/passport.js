var passport = require('passport'), 
    GitHubStrategy = require('passport-github').Strategy;
    User = require('../models/models')
/**
 * Set login con GitHub
 */


passport.use(new GitHubStrategy({
    clientID: "79cbfc62549416fe4ac7",
    clientSecret: "4b7a17099540b856177039ac5b1b4b9b62b5640e",
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(token, tokenSecret, profile, done) {
    process.nextTick(function () {
      console.log(profile);
      User.findOne({uid: profile.id}, function(err, user) {
        if(user) {
          done(null, user);
        } else {
          var user = new User();
          user.provider = "github";
          user.uid = profile.id;
          user.nombre = profile.displayName;
          user.email = profile._json.email;
          user.image = profile._json.avatar_url;
          user.save(function(err) {
            if(err) { throw err; }
             done(null, user);
          });
        }
      });

    });
    
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});


module.exports = passport;