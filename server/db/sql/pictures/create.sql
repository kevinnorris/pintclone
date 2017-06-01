CREATE TABLE ${schema~}.Pictures
(
    id serial PRIMARY KEY,
    ownerId int NOT NULL,
    imgUrl text NOT NULL
);