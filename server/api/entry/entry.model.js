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
    'time_stamp_add': function (doc, req) {
      if (!doc) {
        var new_doc = {};
        if (req.id) {
          new_doc._id = req.id;
        } else {
          new_doc._id = req.uuid;
        }
        new_doc.timestamp = new Date().getTime();
        new_doc.body = eval('(' + req.body + ')');
        return [new_doc, 'added new'];
      }
      doc.timestamp = new Date().getTime();
      return [doc, 'updated'];
    }.toString()

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
