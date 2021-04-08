const express = require('express');
const router  = express.Router();
const { getMapById, deleteMap, editMapById, addMap } = require('../lib/queriesMaps');
const { getUserById, getUserFavorite } = require('../lib/queriesUsers');
const { getAllPinsForMapId } = require('../lib/queriesPins');
const { getFavoritesByUserId } = require('../lib/queriesFavorites')

// /GET/maps/new   =>   page to create a new map
router.get('/new', (req, res) => {
  const id = req.session.user_id;

  getUserById(id)
    .then((user) => {
      const templateVars = {
        user: user,
        light: req.session.light
      };
      console.log('templateVars /maps/new/: ', templateVars);
      return res.render('maps_new', templateVars);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /GET/maps/:id
router.get('/:id', (req, res) => {
  const templateVars = { light: req.session.light };

  getMapById(req.params.id)
    .then((map) => {
      templateVars.map = map;

      return getUserById(req.session.user_id);
    })
    .then((user) => {
      templateVars.user = user;

      return getUserFavorite(req.session.user_id);
    })
    .then((userFavorites) => {
      templateVars.favorites = userFavorites;

      return getAllPinsForMapId(req.params.id);
    })
    .then((pins) => {
      templateVars.pins = pins;

      return getFavoritesByUserId(req.session.user_id);
    })
    .then((mapIdsFavorites) => {
      templateVars.mapIdsFavorites = mapIdsFavorites;

      console.log('templateVars maps/:id/: ', templateVars);
      return res.render('maps_show', templateVars);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});


// /GET/maps/:id/edit
router.get('/:id/edit', (req, res) => {
  const templateVars = { light: req.session.light };

  getMapById(req.params.id)
    .then((map) => {
      templateVars.map = map;

      return getUserById(req.session.user_id);
    })
    .then((user) => {
      templateVars.user = user;

      console.log('templateVars maps/:id/edit/: ', templateVars);
      return res.render('maps_edit', templateVars);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/maps/:id/edit
router.post('/:id/edit', (req, res) => {
  const mapObj = {
    title: req.body.newMapTitle,
    description: req.body.newMapDescription,
    thumbnail_img: req.body.newMapImg,
    id: req.params.id
  };

  editMapById(mapObj)
    .then((result) => {
      res.redirect(`/maps/${req.params.id}`);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/maps/new   =>   add map route
router.post('/new', (req, res) => {

  const mapObj = {
    contributor_id: req.session.user_id,
    title: req.body.newMapTitle,
    description: req.body.newMapDescription,
    thumbnail_img: req.body.newMapImg

  };

  addMap(mapObj)
    .then((result) => {
      res.redirect(`/maps/${result.id}`);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/maps/:id/delete
router.post('/:id/delete', (req, res) => {
  deleteMap(req.params.id)
    .then((result) => {
      res.redirect(`/users/${req.session.user_id}`);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

module.exports = router;
