const express = require('express');
const router  = express.Router();
const { getMaps, getMapById } = require('../db/testQueriesMaps');

// /GET/maps
router.get('/', (req, res) => {
  getMaps()
    .then((maps) => {
      const templateVars = {
        maps: maps.rows
      }
      console.log('templateVars getMaps: ', templateVars);
      return res.render('index', templateVars);
    });
});

// /GET/maps/:id
router.get('/:id', (req, res) => {
  getMapById(req.params.id)
    .then((map) => {
      const templateVars = {
        map: map
      }
      console.log('templateVars getUserMap: ', templateVars);
      return res.render('maps_show', templateVars);
    });
});

// /GET/maps/new

// pins
// /POST/add
// /POST/delete
// /POST/edit
// /GET/all pins with

// /POST/maps/:id/edit
router.post('/:id/edit', (req, res) => {

});

// /POST/maps/new  add map route
router.post('/new', (req, res) => {

});

// /POST/maps/:id/delete
router.post('/:id/delete', (req, res) => {

});


module.exports = router;
