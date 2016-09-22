'use strict';

exports.__esModule = true;
exports['default'] = fetchComponentData;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// eslint-disable-line

var _queueAsync = require('queue-async');

var _queueAsync2 = _interopRequireDefault(_queueAsync);

var defaults = {
  parallelism: 1
};

function fetchComponentData(options, callback) {
  var _$defaults = _lodash2['default'].defaults(options, defaults);

  var store = _$defaults.store;
  var components = _$defaults.components;
  var action = _$defaults.action;
  var parallelism = _$defaults.parallelism;

  var result = {};
  var queue = new _queueAsync2['default'](parallelism);

  components.forEach(function (_Component) {
    if (!_Component) return;
    var Component = _Component.WrappedComponent || _Component;
    if (!Component.fetchData) return;
    queue.defer(function (callback) {
      return Component.fetchData({ store: store, action: action }, function (err, res) {
        if (res) _lodash2['default'].extend(result, res);
        callback(err);
      });
    });
  });

  queue.await(function (err) {
    if (callback) callback(err, result);
  });
}

module.exports = exports['default'];