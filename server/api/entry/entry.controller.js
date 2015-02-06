'use strict';

var _ = require('lodash');
var moment = require('moment');

var Entry = require('./entry.model');
var db = Entry.db;
var schema = Entry.schema;

// Get list of entries
exports.showAll = function (req, res) {
  db.view('entries/all', {
      include_doc: true
    },
    function (err, entries) {
      if (err) {
        return handleError(res, err);
      }
      entries = _.pluck(entries, 'value');
      return res.json(200, entries);
    });
};


// Get a single entry
exports.show = function (req, res) {
  db.get(req.params.id, function (err, entry) {
    if (err) {
      return handleError(res, err);
    }
    if (!entry) {
      return res.send(404);
    }
    return res.json(entry);
  });
};

// Creates a new entry in the DB.
exports.create = function (req, res) {
  delete req.body._id;
  delete req.body.created;
  delete req.body.modified;

  var entry = _.extend(Entry.schema, req.body);
  entry.created = moment().format();

  db.save(entry, function (err, entry) {
    if (err) {
      return handleError(res, err);
    }
    db.get(entry._id, function (err, entry) {
      if (err) {
        return handleError(res, err);
      }
      res.json(201, entry);
    });
  });
};

// Updates an existing entry in the DB.
exports.update = function (req, res) {
  delete req.body._id;
  delete req.body.created;
  delete req.body.modified;

  var entry = _.extend(Entry.schema, req.body);
  entry.modified = moment().format();

  db.save(req.params.id, entry._rev, entry, function (err, entry) {
    if (err) {
      return handleError(res, err);
    }
    if (!entry) {
      return res.send(404);
    }
    db.get(entry._id, function (err, entry) {
      if (err) {
        return handleError(res, err);
      }
      res.json(200, entry);
    });
  });
};

// Deletes a entry from the DB.
exports.remove = function (req, res) {
  db.get(req.params.id, {
    revs_info: true
  }, function (err, entry) {
    db.remove(entry._id, function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  if (err.error === 'conflict') {
    err.statusCode = 409;
  }
  return res.send(err.headers.status || err.statusCode || 500, err);
}
