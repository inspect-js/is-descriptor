/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var utils = require('./utils');

module.exports = function isDescriptor(obj) {
  if (utils.typeOf(obj) !== 'object') return false;
  if ('value' in obj) return utils.isData(obj);
  return utils.isAccessor(obj);
};
