const sql = require('../sql').pictures;

module.exports = (rep, pgp) => (
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

    // Adds a new picture, and returns the new picture;
    add: (params) =>
        rep.one(sql.add, params, (picture) => picture),

    // Delete picture by id;
    delete: (params) =>
        rep.oneOrNone(sql.delete, params),

    // Tries to find a picture from id;
    find: (id) =>
        rep.oneOrNone(sql.find, id),

    // Tries to find a picture by ownerId;
    findByOwnerId: (ownerId) =>
        rep.oneOrNone(sql.findByOwnerId, ownerId),

    // Returns all user records;
    all: () =>
        rep.any('SELECT * FROM Pictures'),

    // Returns the total number of pictures;
    total: () =>
        rep.one('SELECT count(*) FROM Pictures', [], (a) => +a.count),
  }
);
