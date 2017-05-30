/*
    Inserts a new user record.
    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

INSERT INTO ${schema~}.Users(githubId, twitterId, username, displayname, avatarUrl)
VALUES($1, $2, $3, $4, $5)
RETURNING id