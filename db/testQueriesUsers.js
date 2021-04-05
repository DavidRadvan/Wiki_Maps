const db = require('./testDB');

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE name = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

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


module.exports = {

  getUserById,
  getUserFavorite

};
