'use strict';

// Production specific configuration
// =================================
module.exports = {
  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,

  // CouchDB connection options
  couch: {
    uri: 'http://localhost:5984/journalink',
    host: 'http://localhost:5984',
    db: 'journalink'
  }
};
