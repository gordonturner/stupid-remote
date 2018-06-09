var express = require('express');
var router = express.Router();
var swaggerJSDoc = require('swagger-jsdoc');
var debug = require('debug')('stupid-remote:swagger');


var swaggerDefinition = {
  info: {
    title: 'Node Swagger API',
    version: '1.0.0',
    description: 'stupid-remote swagger definition',
  },
  basePath: '/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/*.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);


/* handle GET swagger.json request */
router.get('/swagger.json', function (req, res, next) {
  debug('called swagger.json');
  
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(swaggerSpec));
  res.end();
});

module.exports = router;
