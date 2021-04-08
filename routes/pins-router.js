const express = require('express');
const router  = express.Router();
const { addPin, deletePin, editPin } = require('../lib/queriesPins');

// /POST/pins/add
router.post('/add', (req, res) => {

  const pinObj = {
    longitude: req.body.newLng,
    latitude: req.body.newLat,
    title: req.body.newTitle,
    description: req.body.newDescription,
    pin_img: req.body.newPinImg,
    user_id: req.body.userID,
    map_id: req.body.mapId
  };

  addPin(pinObj)
    .then((result) => {
      res.redirect(`/maps/${req.body.mapId}`);
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/pins/:id/edit
router.post('/:id/edit', (req, res) => {
  const pinObj = {
    title: req.body.newTitle,
    description: req.body.newDescription,
    pin_img: req.body.newPinImg,
    id: req.params.id,
    user_id: req.session.user_id
  };
  editPin(pinObj)
    .then((result) => {
      res.redirect('back');
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

// /POST/pins/:id/delete
router.post('/:id/delete', (req, res) => {
  const pinObj = {
    id: req.params.id
  }
  deletePin(pinObj)
    .then((result) => {
      res.redirect('back');
    }).catch(err => {
      console.log('Error occured');
      console.log(err);
    });
});

module.exports = router;
