'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// Defaults configurations will extend these options
// ============================================
var defaults = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'journalink-secret'
  },

  // List of user roles
  userRoles: ['guest', 'user', 'admin'],

  // CouchDB connection options
  couch: {
    options: {
      db: {
        safe: true
      }
    }
  },

  facebook: {
    clientID:     process.env.FACEBOOK_ID || '1400445780258614',
    clientSecret: process.env.FACEBOOK_SECRET || '23230e296ce510a2b4882e3b9d746eb1',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
  },

  twitter: {
    clientID:     process.env.TWITTER_ID || 'id',
    clientSecret: process.env.TWITTER_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
  },

  google: {
    clientID:     process.env.GOOGLE_ID || 'id',
    clientSecret: process.env.GOOGLE_SECRET || 'secret',
    callbackURL:  (process.env.DOMAIN || '') + '/auth/google/callback'
  }
};

console.log( require('./' + process.env.NODE_ENV + '.js'));

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  defaults,
  require('./' + process.env.NODE_ENV + '.js') || {});