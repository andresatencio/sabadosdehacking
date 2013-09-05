var passport = require('passport'), 
    GitHubStrategy = require('passport-github').Strategy;
    modelos = require('../models/models'),
    User = modelos.usuario, 
    clientID = null, 
    clientSecret = null, 
    callbackURL = null; 
/**
 * Set login con GitHub
 */

var env = function (enviroment){

  if (enviroment == 'heroku'){
    clientID = "79cbfc62549416fe4ac7";
    clientSecret = "4b7a17099540b856177039ac5b1b4b9b62b5640e";
    callbackURL = "http://sabadosdehacking.com.ar/auth/github/callback";
  } else {
    clientID = "dca72a7ec21f3c0f0c20";
    clientSecret = "39295396fecae862f080d60a9c5fd1eddc87e048";
    callbackURL = "http://localhost:3000/auth/github/callback";
  }

  passport.use(new GitHubStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: callbackURL
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
  return passport;
};



passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});



module.exports = env;