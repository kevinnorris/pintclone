const sql = require('../sql').users;

module.exports = (rep, pgp) => (
  /*
    This repository mixes hard-coded and dynamic SQL,
    primarily to show a diverse example of using both.
    */

  {
    // Creates the table;
    create: () =>
        rep.none(sql.create),

    // Initializes the table with some user records, and return their id-s;
    init: () =>
        rep.map(sql.init, [], (row) => row.id),

    // Drops the table;
    drop: () =>
        rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
        rep.none(sql.empty),

    // Adds a new user, and returns the new id;
    add: (params) =>
        rep.one(sql.add, params, (user) => user.id),

    // Tries to delete a user by id, and returns the number of records deleted;
    remove: (id) =>
        rep.result('DELETE FROM Users WHERE id = $1', id, (r) => r.rowCount),

    // Tries to find a user from id;
    find: (id) =>
        rep.oneOrNone(sql.find, id),

    // Tries to find a user by githubId;
    findByGithubId: (githubId) =>
        rep.oneOrNone(sql.findByGithubId, githubId),

    // Returns all user records;
    all: () =>
        rep.any('SELECT * FROM Users'),

    // Returns the total number of users;
    total: () =>
        rep.one('SELECT count(*) FROM Users', [], (a) => +a.count),
  }
);
