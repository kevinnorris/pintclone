SELECT pic.id, pic.ownerId, pic.title, pic.imgUrl, users.username, users.avatarUrl, lcount.likeCount
FROM ${schema~}.Pictures pic
LEFT JOIN (
  SELECT pictureId, COUNT(*) AS likeCount
  FROM ${schema~}.Likes
  GROUP BY pictureId
) lcount ON pic.id=lcount.pictureId
INNER JOIN ${schema~}.Users users ON pic.ownerId=users.id;