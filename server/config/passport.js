// npm packages
const GitHubStrategy = require('passport-github2').Strategy;

// our packages
const db = require('../db');
const configAuth = require('./auth');

module.exports = (passport) => {
  // passportjs with oauth always requires sessions for the initial oauth handshake
  // the github strategy uses oauth thus sessions are required
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  // use GitHubStrategy
  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => {
    process.nextTick(() => {
      // Find user with matching github id
      db.users.findByGithubId(profile.id)
        .then((user) => {
          // If the user exists in db return user
          if (user) {
            console.log('user found');
            return done(null, user);
          }

          // Add new user
          db.users.add([profile.id, profile.username, profile.displayname])
            .then((newUser) => (
              done(null, newUser)
            ))
            .catch((err) => {
              console.log('problem adding user');
              console.log(err);
              throw err;
            });
        })
        .catch((error) => (
          done(error.message || error)
        ));
    });
  }));
};
