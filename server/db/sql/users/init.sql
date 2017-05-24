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

INSERT INTO ${schema~}.Users(githubId, username, displayname) VALUES
(1, 'Demo User 1', 'frist'), -- user 1;
(2, 'Demo User 2', 'second'), -- user 2;
(3, 'Demo User 3', 'third'), -- user 3;
(4, 'Demo User 4', NULL), -- user 4;
(NULL, 'Demo User 5', NULL) -- user 5;
RETURNING id