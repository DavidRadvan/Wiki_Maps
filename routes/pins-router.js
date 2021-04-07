const express = require('express');
const router  = express.Router();
const { addPin, deletePin, editPin } = require('../lib/queriesPins');

// /POST/pins/add
router.post('/new', (req, res) => {
  const pinObj = {
    longitude: req.body.newLng,
    latitude: req.body.newLat,
    title: req.body.newTitle,
    description: req.body.newDescription,
    pin_img: req.body.newPinImg,
  }
  addPin(pinObj)
  .then((result) => {
    res.redirect(`/users/${req.session.user_id}`);
  })
});

// /POST/pins/:id/edit
router.post('/:id', (req, res) => {
  const pinObj = {
    longitude: req.body.newLng,
    latitude: req.body.newLat,
    title: req.body.newTitle,
    description: req.body.newDescription,
    pin_img: req.body.newPinImg,
    id: req.params.id
  }
  editPin(pinObj)
    .then((result) => {
      res.redirect('/pins/:id');
    });
});

// /POST/pins/:id/delete
router.post('/:id/delete', (req, res) => {
  deletePin(req.params.id, req.session.user_id)
    .then((result) => {
      res.redirect(`/users/${req.session.user_id}`);
    })
});

module.exports = router;
