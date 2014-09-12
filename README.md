Consoule
========

Simple `console` based logging with log levels, timestamps, and more soon.

## Install
Consoule is readily available on npm.
 
    npm install consoule
     
## Usage
By default, Consoule adds a date | time and logs everything like usual
including objects, arrays, booleans, and a mix of arguments:
 
    var console = require('consoule')();
    console.log('log');
    console.info('info');
    console.warn('warn');
    console.error('error');
    console.log({ foo: 'bar' }, ['foo','bar'], true);

Which produces output like the following:

    8-8-2014 | 19:14:33 | log
    8-8-2014 | 19:14:33 | info
    8-8-2014 | 19:14:33 | warn
    8-8-2014 | 19:14:33 | error
    8-8-2014 | 19:14:33 | { foo: 'bar' } [ 'foo', 'bar' ] true
    
You can set change the log `level` or `timestamp` output at any point:

    var console = require('consoule')();
    console.setLevel('none');
    console.options.timestamp = false;

## Options

### Log Level
Option: `options.level`  
Default: `all`

To suppress all log output, specify the log `level` of `none`:

    var console = require('consoule')({ level: 'none' });
    
Each log `level` will log itself and everything below it according to the following list.
For instance, `warn` will only log `warn` and `error`. 

    all
    log
    info
    warn
    error
    none
    
### Timestamp
Option: `options.timestamp`  
Default: `true`

Simple date and time output prepended to the logged item.

To refrain from outputting a `timestamp`, specify `false` for this option.

    var console = require('consoule')({ timestamp: false });

### Todo
* Allow custom log output (log to disk, database, or anything you can do with a callback)
* Customizable timestamp format
* Global `console` replacement
* Namespaces / log source
* Performance comparisons
* Various improvements
* Unit tests
