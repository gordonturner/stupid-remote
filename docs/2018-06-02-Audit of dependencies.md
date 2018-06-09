2018-06-02-Audit of dependencies
================================

- Starting list of dependencies:

```
{
  "name": "stupid-remote",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "bootstrap": "3.3.5",
    "chalk": "^1.1.0",
    "cookie-parser": "~1.4.3",
    "debug": "~2.2.0",
    "express": "^4.16.3",
    "http": "0.0.0",
    "lirc_node": "0.0.4",
    "morgan": "^1.9.0",
    "node-cec": "^0.1.2",
    "pug": "~2.0.0-alpha6",
    "serve-favicon": "^2.5.0",
    "sleep": "5.1.0",
    "swagger-jsdoc": "1.3.0",
    "url": "^0.10.3",
    "vs": "^0.1.0"
  }
}
```

- express, web application framework
https://www.npmjs.com/package/express

- pug, template engine
- Was recommended in express reference
https://www.npmjs.com/package/pug

- body-parser, body parsing middleware
- Was recommended in express reference
- Parse incoming request bodies in a middleware before your handlers
- Available under the req.body property
https://www.npmjs.com/package/body-parser

- cookie-parser, cookie header parsing middleware
- Was recommended in express reference
- Parse Cookie header and populate req.cookies
https://www.npmjs.com/package/cookie-parser

- serve-favicon, a favicon serving middleware
- Isolates requests for favicons
https://www.npmjs.com/package/serve-favicon

- morgan, HTTP request logger middleware
- Was recommended in express reference
https://www.npmjs.com/package/morgan

- swagger-jsdoc
https://www.npmjs.com/package/swagger-jsdoc




- lirc_node, provides bridge to lircd
https://www.npmjs.com/package/lirc_node

- node-cec, cec code
https://www.npmjs.com/package/node-cec

- bootstrap, needed for markup
https://www.npmjs.com/package/bootstrap




- chalk
- Terminal string styling
https://www.npmjs.com/package/chalk

- debug, a tiny JavaScript debugging utility
https://www.npmjs.com/package/debug

- sleep, add sleep(), msleep() and usleep() to Node.js, via a C++ binding.
- Used to wait for response from lirc and cec
- Rather brutal way of enforcing timing
https://www.npmjs.com/package/sleep




- url, utilities for URL resolution and parsing
https://www.npmjs.com/package/url




Updates
-------

- Exlcude vs
- Exclude http
- Exclude url

- Update swagger-jsdoc to 1.9.7
- Update debug to 3.1.0
- Update pug to 2.0.3

- Update bootstrap to 4.1.1
- Update chalk to 2.4.1



- Final package:

```
{
  "name": "stupid-remote",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "body-parser": "^1.18.3",
    "bootstrap": "4.1.1",
    "chalk": "2.4.1",
    "cookie-parser": "~1.4.3",
    "debug": "3.1.0",
    "express": "^4.16.3",
    "lirc_node": "0.0.4",
    "morgan": "^1.9.0",
    "node-cec": "^0.1.2",
    "pug": "2.0.3",
    "serve-favicon": "^2.5.0",
    "sleep": "5.1.0",
    "swagger-jsdoc": "1.9.7"
  }
}
```

- task width:100%


```
DEBUG=* node ./bin/www
```









