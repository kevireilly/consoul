'use strict';

/**
 * Consoul constructor
 * @param {Object=} options Configuration options
 *   @param {Boolean=} options.timestamp Output a timestamp. Defaults to `true`.
 *   @param {Boolean=} options.level The levels to log. Defaults to `all`.
 * @returns {Consoul}
 */
function Consoul(options){
  if (typeof options !== 'object') options = {};
  if (options.timestamp !== false) options.timestamp = true;
  this.options = options;
  this.setLevel(this.options.level);
}

/**
 * Available log levels
 * @type {{none: number, error: number, warn: number,
 *         info: number, log: number, all: number}}
 */
Consoul.levels = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  log: 4,
  all: 5
};

/**
 * Active log level. Defaults to logging `all`.
 * @type {Number}
 */
Consoul.level = Consoul.levels.all;

/**
 * Set the active log level.
 * @param {!Number} level The log level to set. Can be set any time.
 */
Consoul.prototype.setLevel = function(level) {
  if (Consoul.levels[level] >= 0) Consoul.level = Consoul.levels[level];
  setup(this.options);
};

/**
 * Setup `console` methods
 * @param {!Object} options Configuration options
 */
function setup(options){
  // Setup base console methods
  Object.keys(console).forEach(function(method){
    Consoul.prototype[method] = console[method];
  });

  // Setup proxied console methods
  ['log', 'info', 'warn', 'error'].forEach(function(method){
    if (Consoul.levels[method] <= Consoul.level){
      Consoul.prototype[method] = function(){
        var args = arguments;
        if (options.timestamp) args = addTimestamp(args);
        console[method].apply(console, args);
      };
    } else {
      Consoul.prototype[method] = function(){
        // Suppress output when log level is not satisfied
      };
    }
  });
}

/**
 * Add a timestamp to the beginning of the output
 * @param {!Array} args Arguments provided to `console`
 * @returns {Array} Mutated `arguments` with timestamp
 */
function addTimestamp(args){
  var newArgs, timestamp = generateTimestamp();
  if (typeof args[0] === 'string') {
    args[0] = timestamp + ' ' + args[0];
    newArgs = args;
  } else {
    newArgs = [timestamp];
    for (var i = 0; i < args.length; i++) {
      newArgs.push(args[i]);
    }
  }
  return newArgs;
}

/**
 * Generate a simple timestamp
 * TODO: Allow this to be configurable via `options`
 * @returns {string} Generated timestamp string
 */
function generateTimestamp(){
  var d = new Date();
  return (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' | ' +
          d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' |';
}

/**
 * Node.JS specific exporting
 * TODO: Handle browsers gracefully
 * @param {Object=} options Configuration options
 * @returns {Consoul} Consoul constructor
 */
module.exports = function(options){
  return new Consoul(options);
};
