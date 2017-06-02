const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('./db');

const apiRoutes = express.Router();

/*
  Json Web Token verification middleware
  ----------------------
*/
function tokenVerify(req, res, next) {
  // check header or url params or post params for token
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  const userId = req.body.userId || req.query.userId;

  // decode token
  if (token && userId) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ success: false, error: err.message });
      } else if (decoded.sub === userId) {
        // if all is well, save to request for use in other routes
        req.decoded = decoded;
        next();
      } else {
        res.status(401).json({ success: false, error: 'Failed to authenticate token.' });
      }
    });
  } else {
    // no token
    res.status(403).json({ success: false, error: 'No token and/or userId provided.' });
  }
}

// Generic GET handler
function GET(url, handler) {
  apiRoutes.get(url, (req, res) => {
    handler(req)
      .then((data) => {
        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error.message || error,
        });
      });
  });
}

// Generic POST handler
function POST(url, handler) {
  apiRoutes.post(url, tokenVerify, (req, res) => {
    handler(req)
      .then((data) => {
        res.json({
          success: true,
          data,
        });
      })
      .catch((error) => {
        res.json({
          success: false,
          error: error.message || error,
        });
      });
  });
}

// ------------ API Routes ------------

// Get joined pictures
GET('/joinedPictures', (req) => {
  if (req.query.userId) {
    return db.joined.picturesAuth(req.query.userId);
  }
  return db.joined.pictures();
});

// Get joined pictures by user
GET('/joinedPicturesByUser/:userId', (req) => {
  if (req.query.userId) {
    return db.joined.picturesAuthByUser(req.query.userId, req.params.userId);
  }
  return db.joined.picturesByUser(req.params.userId);
});

// Get pictures
GET('/pictures', db.pictures.all);

// Get pictures by userId
GET('/pictures/byUserId/:userId', (req) => db.pictures.findByOwnerId(req.params.userId));

// Add a picture
POST('/pictures/add/:imgUrl', (req) => db.pictures.add([req.body.userId, req.params.imgUrl]));

// Remove a picture
POST('/pictures/delete/:pictureId', (req) => db.pictures.delete(req.params.pictureId));

// Add a like
POST('/likes/add/:pictureId', (req) => db.likes.add(req.params.pictureId, req.body.userId));

// Remove a like
POST('/likes/delete/:likeId', (req) => db.likes.delete(req.params.likeId));

// ------------ Debugging Routes ------------

// Get users
GET('/users', db.users.all);

// create table Users:
GET('/users/create', db.users.create);

// add some initial records:
GET('/users/init', db.users.init);

// remove all records from the table:
GET('/users/empty', db.users.empty);

// drop the table:
GET('/users/drop', db.users.drop);

// add a new user with username:
GET('/users/add/:username', (req) => db.users.add([req.query.githubId, req.params.username, req.query.displayname, req.query.avatarUrl]));

// find a user with id:
GET('/users/find/:id', (req) => db.users.find(req.params.id));

GET('/pictures/create', db.pictures.create);
GET('/pictures/init', db.pictures.init);
GET('/pictures/empty', db.pictures.empty);
GET('/pictures/drop', db.pictures.drop);

GET('/likes', db.likes.all);
GET('/likes/create', db.likes.create);
GET('/likes/init', db.likes.init);
GET('/likes/empty', db.likes.empty);
GET('/likes/drop', db.likes.drop);

module.exports = apiRoutes;
