SELECT pic.id, pic.ownerId, pic.title, pic.imgUrl, users.username, users.avatarUrl, lcount.likeCount,
  CASE WHEN userLiked.pictureId IS NOT NULL THEN TRUE ELSE FALSE END AS liked
FROM ${schema~}.Pictures pic
LEFT JOIN (
  SELECT pictureId, COUNT(*) AS likeCount
  FROM ${schema~}.Likes
  GROUP BY pictureId
) lcount ON pic.id=lcount.pictureId
INNER JOIN ${schema~}.Users users ON pic.ownerId=users.id
LEFT JOIN (
  SELECT pictureId
  FROM ${schema~}.Likes
  WHERE userId=$1
) userLiked ON userLiked.pictureId=pic.id
WHERE pic.ownerId=$2;