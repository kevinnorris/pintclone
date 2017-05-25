const users = require('./repos/users');

// Loading all the database repositories separately,
// because event 'extend' is called multiple times:
const repos = {
  users,
};

// pg-promise initialization options:
const options = {
  // Extending the database protocol with our custom repositories:
  extend: (obj) => {
    // Do not use 'require()' here, because this event occurs for every task
    // and transaction being executed, which should be as fast as possible.
    obj.users = repos.users(obj, pgp);

    // Alternatively, you can set all repositories in a loop:
    //
    // for (var r in repos) {
    //    obj[r] = repos[r](obj, pgp);
    // }
  },
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(options);

// Create the database instance:
const db = pgp(process.env.DATABASE_URL);

// If you ever need to change the default pool size, here's an example:
// pgp.pg.defaults.poolSize = 20;

// Database object is all that's needed.
// If you even need access to the library's root (pgp object),
// you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;
