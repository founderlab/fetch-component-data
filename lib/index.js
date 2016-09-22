'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fetchComponentData = require('./fetchComponentData');

var _fetchComponentData2 = _interopRequireDefault(_fetchComponentData);

var _middleware = require('./middleware');

var _middleware2 = _interopRequireDefault(_middleware);

exports.fetchComponentData = _fetchComponentData2['default'];
exports.fetchComponentDataMiddleware = _middleware2['default'];