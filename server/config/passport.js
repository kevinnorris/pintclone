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

  // use TwitterStrategy
  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL,
  },
  (token, tokenSecret, profile, done) => {
    process.nextTick(() => {
      // Find user with matching twitter id
      db.users.findByTwitterId(profile.id)
        .then((user) => {
          // Return existing user
          if (user) {
            console.log('user found');
            return done(null, user);
          }

          // Save new user
          console.log(`twitterId: ${profile.id}, username: ${profile.username}, displayName: ${profile.displayName}, avatar: ${profile._json.profile_image_url}`);
          db.users.add([null, profile.id, profile.username, profile.displayName, profile._json.profile_image_url])
            .then((newUserId) => {
              console.log('saving new user');
              const newUser = {
                id: newUserId,
                githubid: null,
                twitterid: profile.id,
                username: profile.username,
                displayname: profile.displayName,
                avatarurl: profile._json.profile_image_url,
              };

              return done(null, newUser);
            });
        })
        .catch((err) => {
          console.log('problem saving user');
          console.log(err);
          throw err;
        });
    });
  }
));

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
          console.log(`githubId: ${profile.id}, username: ${profile.username}, displayName: ${profile.displayName}, avatar: ${profile._json.avatar_url}`);
          db.users.add([profile.id, null, profile.username, profile.displayName, profile._json.avatar_url])
            .then((newUserId) => {
              console.log('saving new user');
              const newUser = {
                id: newUserId,
                githubid: profile.id,
                twitterid: null,
                username: profile.username,
                displayname: profile.displayName,
                avatarurl: profile._json.avatar_url,
              };

              return done(null, newUser);
            })
            .catch((err) => {
              console.log('problem saving user');
              console.log(err);
              throw err;
            });
        })
        .catch((error) => {
          console.log('final catch returning error');
          return done(error.message || error);
        });
    });
  }));
};
