'use strict';

const isObject = (val) => val !== null && typeof val === 'object';
const dataDesc = new Set([
	'configurable', 'enumerable', 'get', 'set',
]);
const accDesc = new Set([
	'configurable', 'enumerable', 'writable', 'value',
]);

function isDataDesc(keys) {
	return keys.every((k) => dataDesc.has(k));
}

function isAccessorDesc(keys) {
	return keys.every((k) => accDesc.has(k));
}

module.exports = (obj, key, checkProto) => {
	if (!isObject(obj)) {
		return false;
	}
	let desc = key ? Object.getOwnPropertyDescriptor(obj, key) : obj;

	if (!desc && key && checkProto !== false && obj.constructor) {
		desc = Object.getOwnPropertyDescriptor(obj.constructor.prototype, key);
	}

	if (!isObject(desc)) {
		return false;
	}
	if (typeof desc.configurable !== 'boolean' || typeof desc.enumerable !== 'boolean') {
		return false;
	}

	const keys = Object.keys(desc);
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
