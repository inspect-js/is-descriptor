'use strict';

var gOPD = require('gopd');
var hasOwn = require('hasown');
var isDataDescriptor = require('is-data-descriptor');
var isAccessorDescriptor = require('is-accessor-descriptor');

function isObject(val) {
	return val !== null && typeof val === 'object';
}

/*
 * Reads `obj.constructor.prototype` defensively. Returns null if any link
 * in the chain is missing or throws (Object.create(null), a constructor
 * getter that throws, a non-function constructor, etc.).
 */
function getProtoOfCtor(obj) {
	try {
		var ctor = obj.constructor;
		return ctor && ctor.prototype;
	} catch (e) {
		return null;
	}
}

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

			if (checkProto === false) {
				return false;
			}

			var proto = getProtoOfCtor(obj);
			return !!proto && isDescriptor(gOPD(proto, key));
		}

		if (hasOwn(obj, key)) {
			return true;
		}

		if (checkProto !== false) {
			var proto2 = getProtoOfCtor(obj);
			if (proto2) {
				return hasOwn(proto2, key);
			}
		}

		return false;
	}
	desc = obj;

	try {
		if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
			return false;
		}

		return isDataDescriptor(desc) || isAccessorDescriptor(desc);
	} catch (e) {
		/*
		 * throwing getter on configurable/enumerable, or hostile Proxy trap:
		 * a value that throws on inspection is not a valid descriptor.
		 */
		return false;
	}
};
