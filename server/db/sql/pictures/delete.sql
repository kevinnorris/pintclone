DELETE FROM ${schema~}.Pictures
WHERE id = $1 AND ownerId = $2
RETURNING id