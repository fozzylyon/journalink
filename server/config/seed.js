/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var config = require('../config/environment');

// var User = require('../api/user/user.model');
// var Entry = require('../api/entry/entry.model');

// User.find({}).remove(function() {
//   User.create({
//     provider: 'facebook',
//     role: 'admin',
//     name: 'Test User',
//     email: 'test@test.com',
//     password: 'test',
//     facebook: {
//       token: '1234'
//     }
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });