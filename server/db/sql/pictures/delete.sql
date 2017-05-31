DELETE FROM ${schema~}.Pictures
WHERE id = $1
RETURNING id