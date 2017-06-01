CREATE TABLE ${schema~}.Likes
(
    id serial PRIMARY KEY,
    userId int NOT NULL,
    pictureId int NOT NULL
);