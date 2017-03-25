var express = require('express');
var router = express.Router();
var www = require('../bin/www');

var debug = require('debug')('stupid-remote:macro');

var lircNode = require('lirc_node');
lircNode.init();

/**
 * handle GET /aux request
 *
 * echo "tx 2F:82:20:00" | cec-client RPI -s -d 4
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_CYCLEWINDOWS" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 *
 * @swagger
 * /macro/aux:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to aux
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to aux
 */
router.get('/aux', function (req, res, next) {
  debug('called aux');
  
  /*
   *  TODO: Consider refactoring this very procedural process
   */
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_CYCLEWINDOWS', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_UP', function() {
    sleep.msleep(500);
  });
  
  res.writeHead(200, {"Content-Type": "application/json"});
  var html = '{"status":"ok"}';
  res.end(html);
});

module.exports = router;
