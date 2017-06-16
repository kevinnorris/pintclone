/* eslint no-underscore-dangle: 0 */
// npm packages
const GitHubStrategy = require('passport-github2').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;

// our packages
const db = require('../db');
const configAuth = require('./auth');

module.exports = (passport) => {
  // passportjs with oauth always requires sessions for the initial oauth handshake
  // the github and twitter strategies use oauth thus sessions are required
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  function thridPartyCallback(token, tokenSecret, profile, done, dbFind, isTwitter) {
    process.nextTick(() => {
      // Find user with matching thrid party profile id
      dbFind(profile.id)
        .then((user) => {
          // Return existing user
          if (user) {
            return done(null, user);
          }

          // Save new user
          db.users.add([
            isTwitter ? null : profile.id,
            isTwitter ? profile.id : null,
            profile.username,
            profile.displayName,
            isTwitter ? profile._json.profile_image_url : profile._json.avatar_url,
          ])
            .then((newUser) => (
              done(null, newUser)
            ));
        })
        .catch((err) => {
          throw err;
        });
    });
  }

  // use TwitterStrategy
  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
  },
  (token, tokenSecret, profile, done) => (
    thridPartyCallback(token, tokenSecret, profile, done, db.users.findByTwitterId, true)
  )
));

  // use GitHubStrategy
  passport.use(new GitHubStrategy({
    clientID: configAuth.githubAuth.clientID,
    clientSecret: configAuth.githubAuth.clientSecret,
    callbackURL: configAuth.githubAuth.callbackURL,
  },
  (token, refreshToken, profile, done) => (
    thridPartyCallback(token, refreshToken, profile, done, db.users.findByGithubId, false)
    )
  ));
};
