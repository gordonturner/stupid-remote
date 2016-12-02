var express = require('express');
var router = express.Router();
var www = require('../bin/www');

var debug = require('debug')('stupid-remote:cec');

/**
 *  echo "on 0" | cec-client /dev/ttyACM0 -s -d 4
 */
router.get('/tvOn', function(req, res, next) {
  debug('called tvOn');
  
  // echo "tx 10:04" | cec-client /dev/ttyACM0 -s -d 4
  www.cecUsb.sendCommand( 0x10, 0x04 );

  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


/**
 * echo "standby 0" | cec-client /dev/ttyACM0 -s -d 4
 */
router.get('/tvOff', function(req, res, next) {
  debug('called tvOff');
  
  // echo "tx 10:36" | cec-client /dev/ttyACM0 -s -d 4
  www.cecUsb.sendCommand( 0x10, 0x36 );

  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


router.get('/tivo', function(req, res, next) {
  debug('called tivo');
  
  // echo "tx 1F:82:10:00" | cec-client /dev/ttyACM0 -s -d 4
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x10, 0x00 );

  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


router.get('/kodi', function(req, res, next) {
  debug('called kodi');
  
  // echo "tx 1F:82:20:00" | cec-client /dev/ttyACM0 -s -d 4
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x20, 0x00 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


router.get('/ps4', function(req, res, next) {
  debug('called ps4');
  
  // echo "tx 1F:82:30:00" | cec-client /dev/ttyACM0 -s -d 4
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x30, 0x00 );
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});


module.exports = router;
