var express = require('express');
var router = express.Router();
var www = require('../bin/www');

var debug = require('debug')('stupid-remote:cec');

/**
 * handle GET /tvOn request
 *
 *  echo "tx 10:04" | cec-client /dev/ttyACM0 -s -d 4
 *
 * @swagger
 * /cec/tvOn:
 *   get:
 *     tags:
 *       - TV Control
 *     description: Turns on the TV
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully turned tv on
 */
router.get('/tvOn', function (req, res, next) {
  debug('called tvOn');
  
  www.cecUsb.sendCommand( 0x10, 0x04 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


/**
 * handle GET /tvOff request
 *
 * echo "tx 10:36" | cec-client /dev/ttyACM0 -s -d 4
 *
 * @swagger
 * /cec/tvOff:
 *   get:
 *     tags:
 *       - TV Control
 *     description: Turns off the tv
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully turned tv off
 */
router.get('/tvOff', function (req, res, next) {
  debug('called tvOff');
  
  www.cecUsb.sendCommand( 0x10, 0x36 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


/**
 * handle GET /tivo request
 *
 * echo "tx 1F:82:10:00" | cec-client /dev/ttyACM0 -s -d 4
 *
 * @swagger
 * /cec/tivo:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to tivo
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to tivo
 */
router.get('/tivo', function (req, res, next) {
  debug('called tivo');
  
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x10, 0x00 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


/**
 * handle GET /kodi request
 *
 * echo "tx 1F:82:20:00" | cec-client /dev/ttyACM0 -s -d 4
 *
 * @swagger
 * /cec/kodi:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to kodi
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to kodi
 */
router.get('/kodi', function (req, res, next) {
  debug('called kodi');
  
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x20, 0x00 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


/**
 * handle GET /ps4 request
 *
 * echo "tx 1F:82:30:00" | cec-client /dev/ttyACM0 -s -d 4
 *
 * @swagger
 * /cec/ps4:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to ps4
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to ps4
 */
router.get('/ps4', function (req, res, next) {
  debug('called ps4');
  
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x30, 0x00 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


module.exports = router;
