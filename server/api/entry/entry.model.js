'use strict';

var config = require('../../config/environment');
var db = new(require('cradle').Connection)().database(config.couch.db);

var schema = {
  type: 'entry'
};
var designDoc = {
  _id: '_design/entries',

  language: 'javascript',

  updates: {
  },

  views: {
    all: {
      map: function (doc) {
        if (doc.type === 'entry') {
          emit(doc._id, doc);
        }
      }.toString()
    },

    'all-by-date': {
      map: function (doc) {
        if (doc.type === 'entry') {
          emit(doc.postedAt, doc);
        }
      }.toString()
    }
  }
};

db.save(designDoc, function (err) {
  if (err) console.log('Error creating design doc:', designDoc._id);
});

module.exports = {
  schema: schema,
  designDoc: designDoc,
  db: db
};
