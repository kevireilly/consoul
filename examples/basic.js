// Output all `console` methods
// with a prepended timestamp
require('../consoule')({ namespace: 'Basic Example' });

console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.log({ foo: 'bar' }, ['foo','bar'], true);
