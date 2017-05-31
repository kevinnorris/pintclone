CREATE TABLE ${schema~}.Likes
(
    id serial PRIMARY KEY,
    userId number NOT NULL,
    pictureId number NOT NULL
);