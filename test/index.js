'use strict';

require('mocha');
var assert = require('assert');
var isDescriptor = require('../');
var noop = function() {};

describe('isDescriptor', function() {
  describe('value type', function() {
    it('should be false when not an object:', function() {
      assert(!isDescriptor('a'));
      assert(!isDescriptor(null));
      assert(!isDescriptor([]));
    });
  });

  describe('check for descriptor', function() {
    it('should return true if the property exists', function() {
      var obj = {};
      obj.foo = null;

      Object.defineProperty(obj, 'bar', {
        value: 'xyz'
      });

      Object.defineProperty(obj, 'baz', {
        get: function() {
          return 'aaa';
        }
      });

      assert(isDescriptor(obj, 'foo'));
      assert(isDescriptor(obj, 'bar'));
      assert(isDescriptor(obj, 'baz'));
    });
  });

  describe('data descriptor:', function() {
    it('should be false when the object has invalid properties:', function() {
      assert(!isDescriptor({value: 'foo', get: noop}));
      assert(!isDescriptor({get: noop, value: noop}));
    });

    it('should not be false when the object has unrecognize properties:', function() {
      assert(isDescriptor({value: 'foo', bar: 'baz'}));
      assert(isDescriptor({value: 'foo', bar: 'baz'}));
    });

    it('should be true when the object has valid properties:', function() {
      assert(isDescriptor({value: 'foo'}));
      assert(isDescriptor({value: noop}));
    });

    it('should be false when a value is not the correct type:', function() {
      assert(!isDescriptor({value: 'foo', enumerable: 'foo'}));
      assert(!isDescriptor({value: 'foo', configurable: 'foo'}));
      assert(!isDescriptor({value: 'foo', writable: 'foo'}));
    });
  });

  describe('accessor descriptor:', function() {
    it('should be false when the object has invalid properties:', function() {
      assert(!isDescriptor({get: noop, writable: true}));
      assert(!isDescriptor({get: noop, value: true}));
    });

    it('should not be false when the object has unrecognize properties:', function() {
      assert(isDescriptor({get: noop, set: noop, bar: 'baz'}));
    });

    it('should be false when an accessor is not a function:', function() {
      assert(!isDescriptor({get: noop, set: 'baz'}));
      assert(!isDescriptor({get: 'foo', set: noop}));
      assert(!isDescriptor({get: 'foo', bar: 'baz'}));
      assert(!isDescriptor({get: 'foo', set: 'baz'}));
    });

    it('should be false when "get" is not a function', function() {
      assert(!isDescriptor({set: noop}));
      assert(!isDescriptor({get: 'foo'}));
    });

    it('should be true when the object has valid properties:', function() {
      assert(isDescriptor({get: noop, set: noop}));
      assert(isDescriptor({get: noop}));
    });

    it('should be false when a value is not the correct type:', function() {
      assert(!isDescriptor({get: noop, set: noop, enumerable: 'foo'}));
      assert(!isDescriptor({set: noop, configurable: 'foo'}));
      assert(!isDescriptor({get: noop, configurable: 'foo'}));
    });
  });
});
