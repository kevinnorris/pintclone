INSERT INTO ${schema~}.Likes(userId, pictureId)
VALUES($1, $2)
RETURNING *