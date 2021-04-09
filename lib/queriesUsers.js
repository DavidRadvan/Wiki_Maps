const db = require('./db');

// get userInfo object when given id for user
const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

// get an Array of mapObjs when given a user id
const getUserFavorite = (id) => {
  return db.query(`
    SELECT maps.*
    FROM favorites
    JOIN users ON user_id = users.id
    JOIN maps ON map_id = maps.id
    WHERE users.id = $1
    LIMIT 10;
    `, [id])
    .then((response) => {
      return response.rows;
    });
};

// add into favorites a given user id and map_id
const addUserFavorite = (id, map_id) => {
  return db.query(`
    INSERT INTO favorites(user_id, map_id)
    VALUES ($1, $2);
    `, [id, map_id]);
};

module.exports = {

  getUserById,
  getUserFavorite,
  addUserFavorite

};
