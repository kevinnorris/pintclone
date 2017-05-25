/*
    Find a user by id.
    NOTE: We only add schema here to demonstrate the ability of class QueryFile
    to pre-format SQL with static formatting parameters when needs to be.
*/

SELECT * FROM ${schema~}.Users
WHERE id = $1