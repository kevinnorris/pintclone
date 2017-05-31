CREATE TABLE ${schema~}.Pictures
(
    id serial PRIMARY KEY,
    ownerId number NOT NULL,
    imgUrl text NOT NULL
);