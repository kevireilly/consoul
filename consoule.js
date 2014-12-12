var Consoule = (function(){
  'use strict';

  /**
   * Consoule constructor
   *
   * @param {Object=} options Configuration options
   *   @param {Boolean=} options.timestamp Output a timestamp. Defaults to `true`.
   *   @param {Boolean=} options.level The levels to log. Defaults to `all`.
   *   @param {Object=} options.context The `console` instance
   * @returns {Consoule}
   */
  function Consoule(options){
    this.options = typeof options === 'object' ? options : {};
    this.options.timestamp = this.options.timestamp !== false;
    console.getLevel = this.getLevel.bind(this);
    console.setLevel = this.setLevel.bind(this);
    this.setLevel(); // Set level and initialize
  }

  /**
   * Available log levels
   *
   * @type {{none: number, error: number, warn: number,
   *         info: number, log: number, all: number}}
   */
  Consoule.levels = {
    all: 5,
    log: 4,
    info: 3,
    warn: 2,
    error: 1,
    none: 0
  };

  /**
   * Get the active log level
   *
   * @returns {Number} Active log level
   */
  Consoule.prototype.getLevel = function(){
    return this.level;
  };

  /**
   * Set the active log level
   *
   * @param {!Number} level The log level to set. Can be set any time. Defaults to `all`.
   */
  Consoule.prototype.setLevel = function(level) {
    this.level = typeof Consoule.levels[level] === 'number'
                      ? Consoule.levels[level]
                     : typeof Consoule.levels[this.options.level] === 'number'
                      ? Consoule.levels[this.options.level]
                     : Consoule.levels.all;
    // Setup methods with new log level
    this.init();
  };

  /**
   * Setup `console` methods
   */
  Consoule.prototype.init = function(){
    ['log', 'info', 'warn', 'error'].forEach(function(method){
      if (Consoule.levels[method] <= this.level){
        var cache = console[method];
        console[method] = function(){
          var args = Array.prototype.slice.call(arguments);
          if (this.options.timestamp) args.unshift(this.timestamp());
          cache.apply(console, args);
        }.bind(this);
      } else {
        console[method] = this.noop;
      }
    }.bind(this));
  };

  /**
   * Generate a simple timestamp
   * TODO: Allow this to be configurable via `options`
   *
   * @returns {string} Generated timestamp string
   */
  Consoule.prototype.timestamp = function(){
    var d = new Date();
    return (d.getMonth() + 1) + '-' + d.getDate() + '-' + d.getFullYear() + ' | ' +
      d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + ' |';
  };

  /**
   * Used to silence console methods based on set level
   */
  Consoule.prototype.noop = function(){};

  return Consoule;
})();

/**
 * Return a Consoule constructor instance. Mostly to
 * provide a similar interface in node and the browser
 *
 * @param {Object=} options Configuration options
 * @returns {Consoule} Consoule constructor
 */
var consoule = function(options){
  return new Consoule(options);
};

/**
 * Node.JS specific exporting
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = consoule;
}