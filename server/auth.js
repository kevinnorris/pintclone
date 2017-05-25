const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const popupTools = require('popup-tools');

const authRoutes = express.Router();

authRoutes.get('/github', passport.authenticate('github'));

authRoutes.get('/github/callback', passport.authenticate('github'), (req, res) => {
  if (!req.user) {
    return res.status(403).json({ success: false, message: 'Github authentication error.' });
  }
  // Create and send json web token
  const token = jwt.sign({
    sub: req.user.id,
    iss: process.env.APP_URL,
    iat: (new Date().getTime()),
  }, process.env.JWT_SECRET, {
    expiresIn: '4h',
  });

  return res.end(popupTools.popupResponse({
    success: true,
    token,
    user: req.user.id,
  }));
});

module.exports = authRoutes;
