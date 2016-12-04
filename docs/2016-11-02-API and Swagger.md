2016-11-02-API and Swagger
==========================

SwaggerUI
---------

https://github.com/swagger-api/swagger-ui

http://mherman.org/blog/2016/05/26/swagger-and-nodejs/
http://www.mohammedovich.com/2015/10/18/how-to-setup-swagger-ui-nodejs/

- Generate swagger spec:

https://github.com/Surnet/swagger-jsdoc

http://localhost:8080/swagger/swagger.json


Passport.js
-----------

http://passportjs.org/
https://github.com/cholalabs/passport-localapikey


node-swagger-demo
-----------------

- Generate Hello World API:

```
npm install -g swagger
cd ~/Developer/Work
swagger project create node-swagger-demo
cd node-swagger-demo
swagger project edit
```


Swagger UI Config
-----------------

- Editing  `/index.html` in api-docs (formerly dist)

- Disable validation of swagger.json, add after `url: url,`:

```
validatorUrl :null
```


- Add path to 'locally' hosted swagger.json, ie the swagger.json on this server
- Append to url `?url=/swagger/swagger.json`:

http://steve.local:8080/api-docs/?url=/swagger/swagger.json


- Change 'default' name on Swagger UI, need to provide swagger-jsdoc `tag` in `get`:

```
 *   get:
 *     tags:
 *       - TV Control
```

- Expand the `show` for top level elements, set `docExpansion` to `list`:

```
        docExpansion: "list",
```