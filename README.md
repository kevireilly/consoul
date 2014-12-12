Consoule
========

Simple `console` based logging for Node.js and the browser with log levels,
timestamps, and more soon. Automatically replaces `console` with modified behavior.

## Install
Consoule is [soon to be] readily available on npm.
 
    npm install consoule --save
     
## Inclusion
#### Node.js
The rest of the documentation refers to an instance of `consoule` being called,
but you don't *have* to assign it to a variable.

    var consoule = require('consoule');
    
Or simply

    require('consoule')(); // replaces `consoule()` calls in the docs
    
#### Browser
Will make an instance of `consoule` available to be called. 

    <script type="text/javascript" src="js/consoule.js"></script>

## Usage
By default, Consoule adds a date | time and logs everything like usual
including objects, arrays, booleans, and a mix of arguments:
 
    consoule();
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
    
To output only `warn` and `error` output without timestamps:

    consoule({
      level: 'warn',
      timestamp: false
    });
    
You can change the log `level` and `timestamp` output at any point:

    consoule();
    console.log('Will be output with a timestamp');
    
    console.setLevel('error');
    console.options.timestamp = false;
    
    console.log('Will not be output at all');
    console.error('Will be output without a timestamp');

## Options

#### level
Default: `all`

To suppress all log output, specify the log `level` of `none`:

    consoule({
      level: 'none'
    });
    
**Note:** removal of logging as a build process is likely still a good idea
    
Each log `level` will output itself and everything below it according to the following list.
For instance, `warn` will only log `warn` and `error`. 

    all
    log
    info
    warn
    error
    none
    
#### timestamp
Default: `true`

Simple date and time output prepended to the logged item.

To refrain from outputting a `timestamp`, specify `false` for this option.

    consoule({
      timestamp: false
    });

#### Todo
* Allow custom log output (log to disk, database, or anything you can do with a callback)
* Customizable timestamp format
* Namespaces / log source
* Performance comparisons
* Unit tests
