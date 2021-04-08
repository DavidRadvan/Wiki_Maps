DROP TABLE IF EXISTS maps CASCADE;

--- Table for maps ---
-- One map can have many contributors --
CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  contributor_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  thumbnail_img VARCHAR(255) NOT NULL
);
