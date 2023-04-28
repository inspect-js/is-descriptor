'use strict';

require('mocha');
const assert = require('assert');
const isDescriptor = require('../');
function noop() {}

describe('isDescriptor', () => {
	describe('value type', () => {
		it('should be false when not an object:', () => {
			assert(!isDescriptor('a'));
			assert(!isDescriptor(null));
			assert(!isDescriptor([]));
		});
	});

	describe('check for descriptor', () => {
		it('should return true if the property exists', () => {
			const obj = {};
			obj.foo = null;

			Object.defineProperty(obj, 'bar', {
				value: 'xyz',
			});

			Object.defineProperty(obj, 'baz', {
				get() {
					return 'aaa';
				},
			});

			Reflect.defineProperty(obj, 'qux', {
				value: 'xyz',
			});

			assert(isDescriptor(obj, 'foo'));
			assert(isDescriptor(obj, 'bar'));
			assert(isDescriptor(obj, 'baz'));
			assert(isDescriptor(obj, 'qux'));
		});
	});

	describe('data descriptor:', () => {
		it('should be false when the object has invalid properties:', () => {
			assert(!isDescriptor({ value: 'foo', get: noop }));
			assert(!isDescriptor({ get: noop, value: noop }));
		});

		it('should be false when the object has unrecognized properties:', () => {
			assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
			assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
		});

		it('should be false when not descriptors', () => {
			assert(!isDescriptor({ value: 'foo' }));
			assert(!isDescriptor({ value: noop }));
		});

		it('should be false when a value is not the correct type:', () => {
			assert(!isDescriptor({ value: 'foo', enumerable: 'foo' }));
			assert(!isDescriptor({ value: 'foo', configurable: 'foo' }));
			assert(!isDescriptor({ value: 'foo', writable: 'foo' }));
		});
	});

	describe('accessor descriptor:', () => {
		it('should be false when the object has invalid properties:', () => {
			assert(!isDescriptor({ get: noop, writable: true }));
			assert(!isDescriptor({ get: noop, value: true }));
		});

		it('should be false when the object has unrecognize properties:', () => {
			assert(!isDescriptor({ get: noop, set: noop, bar: 'baz' }));
		});

		it('should be false when an accessor is not a function:', () => {
			assert(!isDescriptor({ get: noop, set: 'baz' }));
			assert(!isDescriptor({ get: 'foo', set: noop }));
			assert(!isDescriptor({ get: 'foo', bar: 'baz' }));
			assert(!isDescriptor({ get: 'foo', set: 'baz' }));
		});

		it('should be false when "get" is not a function', () => {
			assert(!isDescriptor({ set: noop }));
			assert(!isDescriptor({ get: 'foo' }));
		});

		it('should be true when the object has all necessary properties', () => {
			assert(isDescriptor({ get: noop, set: noop, configurable: true, enumerable: true }));
		});

		it('should not be true when the object does not have all necessary properties', () => {
			assert(!isDescriptor({ get: noop, set: noop }));
			assert(!isDescriptor({ get: noop }));
		});

		it('should be false when a value is not the correct type:', () => {
			assert(!isDescriptor({ get: noop, set: noop, enumerable: 'foo' }));
			assert(!isDescriptor({ set: noop, configurable: 'foo' }));
			assert(!isDescriptor({ get: noop, configurable: 'foo' }));
		});
	});
});
