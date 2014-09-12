'use strict';

var console = require('../consoule')({ level: 'none' });

console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.log({ foo: 'bar' }, ['foo','bar'], true);
