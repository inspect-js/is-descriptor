'use strict';

var typeOf = require('kind-of');
var isAccessor = require('is-accessor-descriptor');
var isData = require('is-data-descriptor');

module.exports = function isDescriptor(obj, key) {
	if (typeOf(obj) !== 'object') {
		return false;
	}

	if ('get' in obj || 'set' in obj) {
		return isAccessor(obj, key);
	}

	return isData(obj, key);
};
