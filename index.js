/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');
var isAccessor = require('is-accessor-descriptor');
var isData = require('is-data-descriptor');

module.exports = function isDescriptor(obj, key, checkProto) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if (checkProto || (!('get' in obj) && !('set' in obj))) {
    return isData(obj, key, checkProto);
  }
  return isAccessor(obj, key);
};
