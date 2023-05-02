'use strict';

var isObject = function (val) {
	return val !== null && typeof val === 'object';
};

function isDataDesc(keys) {
	return keys.every(function (k) {
		return k === 'configurable' || k === 'enumerable' || k === 'get' || k === 'set';
	});
}

function isAccessorDesc(keys) {
	return keys.every(function (k) {
		return k === 'configurable' || k === 'enumerable' || k === 'writable' || k === 'value';
	});
}

module.exports = function isDescriptor(obj, key, checkProto) {
	if (!isObject(obj)) {
		return false;
	}
	var desc = arguments.length > 1 ? Object.getOwnPropertyDescriptor(obj, key) : obj;

	if (!desc && arguments.length > 1 && checkProto !== false && obj.constructor) {
		desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
	}

	if (!isObject(desc)) {
		return false;
	}
	if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
		return false;
	}

	var keys = Object.keys(desc);
	if (isDataDesc(keys)) {
		if (typeof desc.get !== 'function' && desc.get !== void 0) {
			return false;
		}
		if (typeof desc.set !== 'function' && desc.set !== void 0) {
			return false;
		}
		return true;
	}

	if (isAccessorDesc(keys)) {
		return typeof desc.writable === 'boolean';
	}
	return false;
};
