INSERT INTO ${schema~}.Pictures(ownerId, imgUrl, title)
VALUES($1, $2, $3)
RETURNING *