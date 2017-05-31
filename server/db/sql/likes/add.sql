INSERT INTO ${schema~}.Likes(pictureId, userId)
VALUES($1, $2)
RETURNING id