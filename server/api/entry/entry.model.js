'use strict';

var config = require('../../config/environment');
var db = require('nano')(config.couch.uri);

var design = '_design/entries';
var designDoc = {
  _id: design,

  language: 'javascript',

  updates: {
    'in-place': function (doc, req) {
      return [doc, req];
      var field = req.query.field;
      var value = req.query.value;
      var message = 'set ' + field + ' to ' + value;
      doc[field] = value;
      return [doc, message];
    }.toString(),

    'in-place-result': function (doc, req) {
      doc.field = req.form.field.new_value;
      return [doc, toJSON(doc)];
    }.toString()
  },

  views: {
    entries: {
      map: function (doc) {
        if (doc.type === 'entry') {
          emit(doc._id, doc);
        }
      }.toString()
    },

    'entries-by-date': {
      map: function (doc) {
        if (doc.type === 'entry') {
          emit(doc.postedAt, doc);
        }
      }.toString()
    }
  }
};

var schema = {
  type: 'entry'
};

db.insert(designDoc);

module.exports = {
  schema: schema,
  design: design,
  designDoc: designDoc,
  db: db
};
