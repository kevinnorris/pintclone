const sql = require('../sql').joined;

module.exports = (rep, pgp) => (
  {

    // Get pictures joined with user and likes count
    pictures: () =>
      rep.any(sql.pictures),

    picturesAuth: (id) =>
      rep.any(sql.picturesAuth, id),

    picturesByUser: (id) =>
      rep.any(sql.picturesByUser, id),

    picturesAuthByUser: (id, userId) =>
      rep.any(sql.picturesAuthByUser, [id, userId]),
  }
);
