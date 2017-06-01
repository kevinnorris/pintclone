INSERT INTO ${schema~}.Pictures(ownerId, title, imgUrl) VALUES
(1, 'dog and ball', 'https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg'),
(2, 'dog', 'http://cdn1-www.dogtime.com/assets/uploads/2011/04/file_2153_column_popular-dog-names.jpg'),
(5, '?', 'https://usercontent2.hubstatic.com/13207067_f520.jpg'),
(8, 'kittens', 'http://cdn1-www.cattime.com/assets/uploads/gallery/persian-cats-and-kittens/persian-cats-and-kittens-1.jpg'),
(5, 'test', 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg')
RETURNING id