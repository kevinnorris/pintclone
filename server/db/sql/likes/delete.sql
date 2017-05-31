DELETE FROM ${schema~}.Likes
WHERE id = $1
RETURNING id