CREATE TABLE task (
    id serial primary key,
    content varchar(63),
    date timestamp with time zone,
    isComplete boolean
);

ALTER TABLE task ALTER COLUMN date SET DEFAULT current_timestamp;
ALTER TABLE task ALTER COLUMN isComplete SET DEFAULT false;