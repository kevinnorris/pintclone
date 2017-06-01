CREATE TABLE ${schema~}.Pictures
(
    id serial PRIMARY KEY,
    ownerId int NOT NULL,
    title text NOT NULL,
    imgUrl text NOT NULL
);