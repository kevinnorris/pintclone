INSERT INTO ${schema~}.Likes(userId, pictureId) VALUES
(4, 1),
(1, 1),
(3, 2),
(3, 4),
(2, 1)
RETURNING id