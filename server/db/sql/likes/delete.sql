DELETE FROM ${schema~}.Likes
WHERE userId = $1 AND pictureId = $2
RETURNING *