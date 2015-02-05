'use strict';

var _ = require('lodash');
var Entry = require('./entry.model');
var schema = Entry.schema;

// Get list of entrys
exports.showAll = function (req, res) {
  Entry.db.view('entries', 'entries', {
      include_doc: true
    },
    function (err, entrys) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, entrys);
    });
};


// Get a single entry
exports.show = function (req, res) {
  Entry.db.get(req.params.id, function (err, entry) {
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
  var entry = _.extend(Entry.schema, req.body);

  Entry.db.insert(entry, function (err, entry) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, entry);
  });
};

// Updates an existing entry in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var entry = _.extend(Entry.schema, req.body);

  Entry.db.get(req.params.id, function (err, oldEntry) {
    if (err) {
      return handleError(res, err);
    }
    Entry.db.insert(_.extend(oldEntry, entry), req.params.id, function (err, resp) {
      if (err) {
        return handleError(res, err);
      }
      if (!resp) {
        return res.send(404);
      }
      return res.json(200, resp);
    });
  });
};

// Deletes a entry from the DB.
exports.remove = function (req, res) {
  Entry.db.get(req.params.id, {
    revs_info: true
  }, function (err, entry) {
    Entry.db.destroy(entry._id, entry._revs_info[0].rev, function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(err.statusCode || 500, err);
}
