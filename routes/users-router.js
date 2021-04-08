const express = require('express');
const router  = express.Router();
const { getUserById, getUserFavorite, addUserFavorite } = require('../lib/queriesUsers');
const { getContributedByUser } = require('../lib/queriesMaps');
const { getFavoritesByUserId } = require('../lib/queriesFavorites')

// /GET/users/logout/:id   =>  deletes cookie session
router.get('/logout/:id', (req, res) => {
  req.session.user_id = null;
  res.redirect('/');
});

//  /GET/users/:id
router.get('/:id', (req, res) => {
  const templateVars = { light: req.session.light };
  getUserById(req.params.id)
    .then((user) => {
      templateVars.user = user;

      return getUserFavorite(req.params.id);
    })
    .then((userFavorite) => {
      templateVars.userFavourite = userFavorite;

      return getContributedByUser(req.params.id);
    })
    .then((contributions) => {
      templateVars.contributions = contributions;

    return getFavoritesByUserId(req.session.user_id);
  })
  .then((mapIdsFavorites) => {
    templateVars.mapIdsFavorites = mapIdsFavorites;

      console.log('templateVars users/:id/: ', templateVars);
      return res.render('profile_show', templateVars);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });

});

//  /GET/users/login/:id    generates cookies
router.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  getUserById(req.params.id)
    .then((user) => {
      return res.redirect('/');
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/users/:id    adds favourites
router.post('/:id/:map_id', (req, res) => {
  addUserFavorite(req.params.id, req.params.map_id);
});

module.exports = router;
