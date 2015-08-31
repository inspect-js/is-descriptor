/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var typeOf = require('kind-of');
var isAccessor = require('is-accessor-descriptor');
var isData = require('is-data-descriptor');

module.exports = function isDescriptor(obj) {
  if (typeOf(obj) !== 'object') return false;
  if ('value' in obj) return isData(obj);
  return isAccessor(obj);
};
