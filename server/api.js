const express = require('express');
const db = require('./db');

const apiRoutes = express.Router();

// Generic GET handler;
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

// API Routes


// Debugging Routes

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

module.exports = apiRoutes;
