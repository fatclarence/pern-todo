-- CREATE DATABASE perntodo;

CREATE TABLE todo (
    todo_id BIGSERIAL PRIMARY KEY, 
    description VARCHAR(255)
);

CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    UNIQUE (email)
);