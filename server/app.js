/**
 * Main application file
 */

'use strict';

// Set default node environment to dev
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

var path = require('path');
var express = require('express');
var config = require('./config/environment');

// Connect to database
// Set global connection settings
var cradle = require('cradle').setup({
  host: config.couch.host,
  port: config.couch.port
});

var db = new(cradle.Connection)().database(config.couch.db);
db.create(function (err, body) {
  if (err) {
    console.log(err.reason);
  } else {
    console.log(config.couch.db, 'database created.');
  }
});

// Populate DB with sample data
if (config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();
app.set('db', db);
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
