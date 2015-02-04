/**
 * Main application file
 */

'use strict';

// Set default node environment to dev
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var express = require('express');
var config = require('./config/environment');

// Connect to database
var nano = require('nano')(config.couch.host);
nano.db.create(config.couch.db, function (err, body) {
  if (err) {
    console.log(err.reason);
  }
});
nano.use(config.couch.db);


// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'prod') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;