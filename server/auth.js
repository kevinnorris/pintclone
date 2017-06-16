const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const popupTools = require('popup-tools');

const authRoutes = express.Router();

function sendToken(authType, req, res) {
  if (!req.user) {
    return res.status(403).json({ success: false, message: `${authType} authentication error.` });
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
    user: req.user,
    expiresIn: 14400000,
  }));
}

authRoutes.get('/twitter', passport.authenticate('twitter'));

authRoutes.get('/twitter/callback', passport.authenticate('twitter'), (req, res) => {
  sendToken('Twitter', req, res);
});

authRoutes.get('/github', passport.authenticate('github'));

authRoutes.get('/github/callback', passport.authenticate('github'), (req, res) => {
  sendToken('Github', req, res);
});

module.exports = authRoutes;
