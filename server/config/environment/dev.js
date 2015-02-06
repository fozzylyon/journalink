'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // CouchDB connection options
  couch: {
    uri: 'http://localhost:5984/journalink-dev',
    host: 'http://localhost',
    port: 5984,
    db: 'journalink-dev'
  },

  seedDB: true
};
