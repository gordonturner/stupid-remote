README Startup
==============

- NOTE: This requires cec-client and libs to be installed.  

- Install node dependencies, from the root of the project run:

```
npm install
```


- Start the app, from the root of the project run:

```
node ./bin/www
```


- Debug startup:

```
DEBUG=* node ./bin/www
```


Errors
------

- If cec-client is not installed you will get something like:

```
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: spawn cec-client ENOENT
    at exports._errnoException (util.js:1026:11)
    at Process.ChildProcess._handle.onexit (internal/child_process.js:193:32)
    at onErrorNT (internal/child_process.js:359:16)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
    at Module.runMain (module.js:606:11)
    at run (bootstrap_node.js:394:7)
    at startup (bootstrap_node.js:149:9)
    at bootstrap_node.js:509:3
```