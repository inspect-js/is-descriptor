'use strict';

var gOPD = require('gopd');
var hasOwn = require('hasown');
var isDataDescriptor = require('is-data-descriptor');
var isAccessorDescriptor = require('is-accessor-descriptor');

var isObject = function (val) {
	return val !== null && typeof val === 'object';
};

module.exports = function isDescriptor(obj, key, checkProto) {
	if (!isObject(obj)) {
		return false;
	}

	var desc;
	if (arguments.length > 1) {
		if (gOPD) {
			desc = gOPD(obj, key);
			if (desc) {
				return isDescriptor(desc);
			}
			return checkProto !== false
				&& obj.contructor
				&& isDescriptor(gOPD(obj.constructor.prototype, key));
		}
		if (hasOwn(obj, key)) {
			return true;
		}
		if (checkProto !== false && obj.constructor) {
			return hasOwn(obj.constructor.prototype, key);
		}
		return false;
	}
	desc = obj;

	if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
		return false;
	}

	return isDataDescriptor(desc) || isAccessorDescriptor(desc);
};
