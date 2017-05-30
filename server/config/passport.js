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
            console.log('user found');
            return done(null, user);
          }

          // Save new user
          const profileId = isTwitter ? 'twitterId:' : 'githubId:';
          console.log(`${profileId} ${profile.id}, username: ${profile.username}, displayName: ${profile.displayName}, avatar: ${isTwitter ? profile._json.profile_img_url : profile._json.avatar_url}`);
          db.users.add([
            isTwitter ? null : profile.id,
            isTwitter ? profile.id : null,
            profile.username,
            profile.displayname,
            isTwitter ? profile._json.profile_image_url : profile._json.avatar_url,
          ])
            .then((newUserId) => {
              console.log('saving new user');
              const newUser = {
                id: newUserId,
                githubid: isTwitter ? null : profile.id,
                twitterid: isTwitter ? profile.id : null,
                username: profile.username,
                displayname: profile.displayName,
                avatarurl: isTwitter ? profile._json.profile_image_url : profile._json.avatar_url,
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
