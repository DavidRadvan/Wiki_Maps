const db = require('./db');

// Takes in a map_id, returns an array of Pin Objects for the given map
const getAllPinsForMapId = (mapId) => {
  return db.query('SELECT * FROM pins WHERE map_id = $1', [mapId])
    .then((response) => {
      return response.rows;
    });
};

// Get pin info Object for a given id
const getPinById = (id) => {

  const queryString = `SELECT * from pins WHERE id = $1`;
  const queryParams = [id];

  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    });
};


// Takes in a pin Object with all the pin data, adds to the database;
const addPin = (pinObj) => {

  console.log('is this function even getting called', pinObj)

  const queryString = `
  INSERT INTO pins (
    longitude,
    latitude,
    title,
    description,
    pin_img,
    user_id,
    map_id
    ) VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING pins.*`;



  const queryParams = [
    pinObj.longitude,
    pinObj.latitude,
    pinObj.title,
    pinObj.description,
    pinObj.pin_img,
    pinObj.user_id,
    pinObj.map_id
  ];


  return db.query(queryString, queryParams)
    .then((response) => {
      return response.rows[0];
    })
    .catch((err) => {
      return 'unable to add pin onto map';
    });
};

// takes in a pinObj, and edit the pin. Returns the new pinObj
const editPin = (pinObj) => {

  const queryString = `
  UPDATE pins
  SET
    title = $1,
    description = $2,
    pin_img = $3,
    user_id = $4

  WHERE id = $5;`;

  const queryParams = [
    pinObj.title,
    pinObj.description,
    pinObj.pin_img,
    pinObj.user_id,
    pinObj.id
  ];


  return db.query(queryString, queryParams)
    .then((response) => {
      return 'Successfully edited pin!';
    })
}


const deletePin = (pinObj) => {
  return db.query(`DELETE FROM pins WHERE id = $1`, [pinObj.id])
    .then((response) => {
      return 'Pin Deleted';
    });
};


module.exports = {

  getAllPinsForMapId,
  addPin,
  deletePin,
  getPinById,
  editPin

};
