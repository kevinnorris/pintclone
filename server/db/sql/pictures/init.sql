INSERT INTO ${schema~}.Pictures(ownerId, title, imgUrl) VALUES
(1, 'Dog and ball', 'https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg'),
(2, 'Lake', 'http://68.media.tumblr.com/120a0b61fbcc1230afa260b0fb630c82/tumblr_o6psviLnTk1tlcrm6o1_1280.jpg'),
(5, 'Sky and Ocean', 'http://68.media.tumblr.com/a5810e52ba40552db7452eb2434b5c01/tumblr_nvkug4OChm1ttq3fbo1_1280.jpg'),
(3, 'Walkway', 'http://25.media.tumblr.com/tumblr_lhyp6f7pgn1qh89nko1_500.jpg'),
(2, 'Roll', 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg'),
(3, 'Street', 'https://s-media-cache-ak0.pinimg.com/736x/4d/d1/0c/4dd10ce1fa9ebf73e57d8284067ae72e.jpg')
RETURNING id