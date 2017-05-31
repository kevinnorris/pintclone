INSERT INTO ${schema~}.Pictures(ownerId, imgUrl)
VALUES($1, $2)
RETURNING id