/**
 * Consoul constructor
 * @param {object=} options
 * @returns {Consoul}
 */
function Consoul(options){
  options = options || {};
  // Turn timestamps on by default
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
 * @type {number}
 */
Consoul.level = Consoul.levels.all;


/**
 * Set the active log level.
 * @param level
 */
Consoul.prototype.setLevel = function(level) {
  if (Consoul.levels[level] >= 0) {
    Consoul.level = Consoul.levels[level];
  }
  setup(this.options);
};

/**
 * Setup `console` methods
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
        if (options.timestamp) arguments = addTimestamp(arguments);
        console[method].apply(console, arguments);
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
 * @param args
 * @returns {*}
 */
function addTimestamp(args){
  var newArgs, timestamp = generateTimestamp();
  if (typeof args[0] === 'string') {
    args[0] = timestamp + ' ' + args[0];
    newArgs = args;
  } else {
    newArgs = [timestamp];
    for (var i in args) {
      newArgs.push(args[i]);
    }
  }
  return newArgs;
}

function generateTimestamp(){
  var d = new Date();
  return (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' | ' +
          d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' |';
}

module.exports = function(options){
  return new Consoul(options);
};
