'use strict';

var console = require('../consoul')({ level: 'none' });

console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.log({ foo: 'bar' }, ['foo','bar'], true);
