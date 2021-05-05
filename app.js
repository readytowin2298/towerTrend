const Tower = require('./models/tower')
const express = require('express');
const app = express();
const ExpressError = require("./helpers/expressError");

app.set('view engine', 'pug')

const towerRoutes = require('./routes/towerRoutes.js');
app.use('/graph', towerRoutes);

/** 404 handler */


app.get('/', async function (req, res, next) {
  towers = await Tower.genTowers()
  res.render('index', { towers })
})


app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404);
  
    // pass the error to the next piece of middleware
    return next(err);
  });
  
  /** general error handler */
  
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      status: err.status,
      message: err.message
    });
  });
  
  module.exports = app;