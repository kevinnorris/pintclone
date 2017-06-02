/*
    Inserting a few demo users into the database, and returning their id-s;
    NOTES:
    - You can do multiple separate inserts, if you want, but using
      a single concatenated insert is significantly faster.
    - We only add schema here to demonstrate the ability of class QueryFile
      to pre-format SQL with static formatting parameters when needs to be.
    See also:
    https://github.com/vitaly-t/pg-promise/wiki/Performance-Boost
*/

INSERT INTO ${schema~}.Users(githubId, twitterId, username, displayname, avatarUrl) VALUES
(1, null, 'DemoUser1', 'D User 1', ''),
(387566, null, 'DemoUser2', 'D User 2', ''),
(9456, null, 'DemoUser3', 'D User 3', ''),
(null, 559846, 'DemoUser4', 'D User 4', ''),
(null, 384958, 'DemoUser5', 'D User 5', ''),
(null, 1293847, 'DemoUser6', 'D User 6', '')
RETURNING id