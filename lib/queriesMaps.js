const { response } = require('express');
const db = require('./db');

// gets all maps with a limit of of given number, or defaults to 20;
const getMaps = (limit = 20) => {
  return db.query('SELECT * FROM maps LIMIT $1', [limit])
    .then((response) => {
      return response.rows;
    });
};

// get map when given specific id
const getMapById = (id) => {
  return db.query('SELECT * FROM maps WHERE id = $1', [id])
    .then((response) => {
      return response.rows[0];
    });
};

// Takes in mapObj and updates SQL database with the mapObj info
const editMapById = (mapObj) => {

  const queryString = `
  UPDATE maps
  SET
    title = $1,
    description = $2,
    thumbnail_img = $3

  WHERE id = $4;`;

  const queryParams = [
    mapObj.title,
    mapObj.description,
    mapObj.thumbnail_img,
    mapObj.id
  ];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};


// Takes in map obj and inserts into the SQL database
const addMap = (mapObj) => {

  const queryString = `
  INSERT INTO maps (contributor_id, title, description, thumbnail_img)
  VALUES ($1, $2, $3, $4) RETURNING maps.id`;

  const queryParams = [
    mapObj.contributor_id,
    mapObj.title,
    mapObj.description,
    mapObj.thumbnail_img,
  ];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

// delete map when given map_id and contributor id;
const deleteMap = (map_id) => {
  const queryString = `
  DELETE FROM maps WHERE maps.id = $1`;

  const queryParams = [map_id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};

// Returns all unique mapObjs for a user that had either
// created a map or contributed with a pin on a map
const getContributedByUser = (id) => {
  const queryString = `
  SELECT DISTINCT maps.*
  FROM maps
  LEFT JOIN pins ON maps.id = map_id
  WHERE user_id = $1
  OR contributor_id = $1`;

  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response)=> {
      return response.rows;
    });
};

module.exports = {

  getMaps,
  getMapById,
  editMapById,
  getContributedByUser,
  addMap,
  deleteMap

};
