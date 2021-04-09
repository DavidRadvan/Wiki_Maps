const express = require('express');
const router  = express.Router();

// Toggles the light cookie on or off

router.get('/off', (req, res) => {

  req.session.light = 'off';
  res.redirect('back');

});

router.get('/on', (req, res) => {

  req.session.light = null;
  res.redirect('back');

});

module.exports = router;
