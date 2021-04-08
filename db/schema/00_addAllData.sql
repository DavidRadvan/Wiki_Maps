DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS maps CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS pins CASCADE;

--- table for users ---
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR (255) NOT NULL,
  city VARCHAR (255) NOT NULL,
  profile_pic VARCHAR (255) NOT NULL
);



--- Table for maps ---
-- One map can have many contributors --
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_img VARCHAR(255) NOT NULL

);



--- Table for favorites---
-- Links Users and Maps in a Many to Many relationship
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);



--- Table for Pins ---
-- One map can have many pins --
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  longitude VARCHAR(255) NOT NULL,
  latitude VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  pin_img VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);
