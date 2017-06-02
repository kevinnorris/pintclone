const sql = require('../sql').likes;

module.exports = (rep, pgp) => (
  {
    // Creates the table;
    create: () =>
        rep.none(sql.create),

    // Initializes the table with some Likes records, and return their id's;
    init: () =>
        rep.map(sql.init, [], (row) => row.id),

    // Drops the table;
    drop: () =>
        rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
        rep.none(sql.empty),

    // Adds a new like, and returns the new id;
    add: (params) =>
        rep.one(sql.add, params, (like) => like.id),

    // Delete picture by id;
    delete: (id) =>
        rep.oneOrNone(sql.delete, id),

    // Tries to find a like from id;
    find: (id) =>
        rep.oneOrNone(sql.find, id),

    // Tries to find a like by pictureId;
    findByPictureId: (pictureId) =>
        rep.oneOrNone(sql.findByPictureId, pictureId),

    // Tries to find a like by userId;
    findByUserId: (userId) =>
        rep.oneOrNone(sql.findByUserId, userId),

    // Returns all like records;
    all: () =>
        rep.any('SELECT * FROM Likes'),

    // Returns the total number of like;
    total: () =>
        rep.one('SELECT count(*) FROM Likes', [], (a) => +a.count),
  }
);
