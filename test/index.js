'use strict';

var test = require('tape');
var isDescriptor = require('../');
function noop() {}

test('isDescriptor', function (t) {
	t.test('value type: is false when not an object', function (st) {
		st.notOk(isDescriptor('a'));
		st.notOk(isDescriptor(null));
		st.notOk(isDescriptor([]));

		st.end();
	});

	t.test('check for descriptor', function (st) {
		st.test('returns true if the property exists', function (s2t) {
			var obj = { foo: null };

			Object.defineProperty(obj, 'bar', {
				value: 'xyz'
			});

			Object.defineProperty(obj, 'baz', {
				get: function () {
					return 'aaa';
				}
			});

			(typeof Reflect === 'function' ? Reflect : Object).defineProperty(obj, 'qux', {
				value: 'xyz'
			});

			s2t.ok(isDescriptor(obj, 'foo'));
			s2t.ok(isDescriptor(obj, 'bar'));
			s2t.ok(isDescriptor(obj, 'baz'));
			s2t.ok(isDescriptor(obj, 'qux'));

			s2t.end();
		});

		st.end();
	});

	t.test('data descriptor:', function (st) {
		st.test('is false when the object has invalid properties:', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo', get: noop }));
			s2t.notOk(isDescriptor({ get: noop, value: noop }));

			s2t.end();
		});

		st.test('is false when the object has unrecognized properties:', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo', bar: 'baz' }));
			s2t.notOk(isDescriptor({ value: 'foo', bar: 'baz' }));

			s2t.end();
		});

		st.test('is false when not descriptors', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo' }));
			s2t.notOk(isDescriptor({ value: noop }));

			s2t.end();
		});

		st.test('is false when a value is not the correct type:', function (s2t) {
			s2t.notOk(isDescriptor({ value: 'foo', enumerable: 'foo' }));
			s2t.notOk(isDescriptor({ value: 'foo', configurable: 'foo' }));
			s2t.notOk(isDescriptor({ value: 'foo', writable: 'foo' }));

			s2t.end();
		});

		st.end();
	});

	t.test('accessor descriptor:', function (st) {
		st.test('is false when the object has invalid properties:', function (s2t) {
			s2t.notOk(isDescriptor({ get: noop, writable: true }));
			s2t.notOk(isDescriptor({ get: noop, value: true }));

			s2t.end();
		});

		st.test('is false when the object has unrecognize properties:', function (s2t) {
			s2t.notOk(isDescriptor({ get: noop, set: noop, bar: 'baz' }));

			s2t.end();
		});

		st.test('is false when an accessor is not a function:', function (s2t) {
			s2t.notOk(isDescriptor({ get: noop, set: 'baz' }));
			s2t.notOk(isDescriptor({ get: 'foo', set: noop }));
			s2t.notOk(isDescriptor({ get: 'foo', bar: 'baz' }));
			s2t.notOk(isDescriptor({ get: 'foo', set: 'baz' }));

			s2t.end();
		});

		st.test('is false when "get" is not a function', function (s2t) {
			s2t.notOk(isDescriptor({ set: noop }));
			s2t.notOk(isDescriptor({ get: 'foo' }));

			s2t.end();
		});

		st.test('is true when the object has all necessary properties', function (s2t) {
			s2t.ok(isDescriptor({ get: noop, set: noop, configurable: true, enumerable: true }));

			s2t.end();
		});

		st.test('is false when the object does not have all necessary properties', function (s2t) {
			s2t.notOk(isDescriptor({ get: noop, set: noop }));
			s2t.notOk(isDescriptor({ get: noop }));

			s2t.end();
		});

		st.test('is false when a value is not the correct type:', function (s2t) {
			s2t.notOk(isDescriptor({ get: noop, set: noop, enumerable: 'foo' }));
			s2t.notOk(isDescriptor({ set: noop, configurable: 'foo' }));
			s2t.notOk(isDescriptor({ get: noop, configurable: 'foo' }));

			s2t.end();
		});
	});
});
