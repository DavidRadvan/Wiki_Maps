const db = require('./db');

// add favorite takes in favorite Object with user_id, map_id values, and adds to favorite database
const addFavorite = (favObj) => {

  const queryString = `
  INSERT INTO favorites (user_id, map_id) VALUES ($1, $2);`;

  const queryParams = [favObj.user_id, favObj.map_id];

  console.log('favObj:', favObj);
  return db.query(queryString, queryParams)
    .then((response) => {
      return Promise.resolve('successfully added!');
    });
};

// delete favorite takes in favorite object with user_id, map_id, and deletes data where both id's match in database
const deleteFavorite = (favObj) => {

  const queryString = `
  DELETE FROM favorites WHERE user_id = $1 AND map_id = $2;`;

  const queryParams = [favObj.user_id, favObj.map_id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return Promise.resolve('successfully deleted!');
    });
};

// This returns an Array ofmap_ids for a given user
const getFavoritesByUserId = (user_id) => {

  const queryString = `
  SELECT map_id FROM favorites WHERE user_id = $1`;

  const queryParams = [user_id];

  return db.query(queryString, queryParams)
    .then((response) => {
      let returnArr = [];
      response.rows.forEach(mapIdObj => {
        returnArr.push(mapIdObj.map_id);
      });
      return returnArr;
    });
};

module.exports = {
  addFavorite,
  deleteFavorite,
  getFavoritesByUserId
};

// mapIdsFavorites: [
//   anonymous { map_id: 12 },
//   anonymous { map_id: 42 },
//   anonymous { map_id: 11 }
// ]
