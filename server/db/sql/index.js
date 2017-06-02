const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

// /////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file) {
  const fullPath = path.join(__dirname, file); // generating full path;

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // Showing how to use static pre-formatting parameters -
    // we have variable 'schema' in each SQL (as an example);
    params: {
      schema: 'public', // replace ${schema~} with "public"
    },
  };

  const qf = new QueryFile(fullPath, options);

  if (qf.error) {
    // Something is wrong with our query file :(
    // Testing all files through queries can be cumbersome,
    // so we also report it here, while loading the module:
    console.error(qf.error);
  }

  return qf;

  // See QueryFile API:
  // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

module.exports = {
  users: {
    create: sql('users/create.sql'),
    empty: sql('users/empty.sql'),
    init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    add: sql('users/add.sql'),
    find: sql('users/find.sql'),
    findByGithubId: sql('users/findByGithubId.sql'),
    findByTwitterId: sql('users/findByTwitterId.sql'),
  },
  pictures: {
    delete: sql('pictures/delete.sql'),
    create: sql('pictures/create.sql'),
    empty: sql('pictures/empty.sql'),
    init: sql('pictures/init.sql'),
    drop: sql('pictures/drop.sql'),
    add: sql('pictures/add.sql'),
    find: sql('pictures/find.sql'),
    findByOwnerId: sql('pictures/findByOwnerId.sql'),
  },
  likes: {
    delete: sql('likes/delete.sql'),
    create: sql('likes/create.sql'),
    empty: sql('likes/empty.sql'),
    init: sql('likes/init.sql'),
    drop: sql('likes/drop.sql'),
    add: sql('likes/add.sql'),
    find: sql('likes/find.sql'),
    findByPictureId: sql('likes/findByPictureId.sql'),
    findByUserId: sql('likes/findByUserId.sql'),
  },
  joined: {
    pictures: sql('joined/pictures.sql'),
    picturesAuth: sql('joined/picturesAuth.sql'),
  },
};
