// Only output `console.error`
// and suppress timestamp output
require('../consoule')({
  level: 'error',
  timestamp: false
});

console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
