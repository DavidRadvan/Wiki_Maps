// load .env data into process.env
require('dotenv').config({silent: true});

// Web server config
const PORT                             = process.env.PORT || 8080;
const ENV                              = process.env.ENV || "development";
const express                          = require("express");
const bodyParser                       = require("body-parser");
const sass                             = require("node-sass-middleware");
const app                              = express();
const morgan                           = require('morgan');
const cookieSession                    = require('cookie-session');
const { getMaps }                      = require('./lib/queriesMaps');
const { getUserById, getUserFavorite } = require('./lib/queriesUsers');
const { getFavoritesByUserId }         = require('./lib/queriesFavorites');

// Middlewares
app.use(morgan('dev'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'userId',
  keys: ['key1', 'key2']
}))

// Separated Routes for each Resource
const mapsRouter      = require('./routes/maps-router');
const usersRouter     = require('./routes/users-router');
const pinsRouter      = require('./routes/pins-router');
const favoritesRouter = require('./routes/favorites-router');
const lightsRouter    = require('./routes/lights-router');

// Mount all resource routes
app.use("/maps", mapsRouter);
app.use("/users", usersRouter);
app.use("/pins", pinsRouter);
app.use("/favorites", favoritesRouter);
app.use("/lights", lightsRouter);

// Home page
app.get('/', (req, res) => {
  const templateVars = { light: req.session.light };

  getMaps()
    .then((maps) => {
      templateVars.maps = maps;

      return getUserById(req.session.user_id);
    })
    .then((user) => {
      templateVars.user = user;

      return getUserFavorite(req.session.user_id);
    })
    .then((userFavorites) => {
      templateVars.favorites = userFavorites;

      return getFavoritesByUserId(req.session.user_id);
    })
    .then((mapIdsFavorites) => {
      templateVars.mapIdsFavorites = mapIdsFavorites;

      console.log('templateVars homepage: ', templateVars);
      return res.render('index', templateVars);
    });

});

// Catch route
app.get('*', (req, res) => {
  res.status(404).send('Error 404 Page not found.');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
