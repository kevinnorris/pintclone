/*
    Find a user by github id.
*/

SELECT * FROM ${schema~}.Users
WHERE githubId = $1