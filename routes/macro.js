var express = require('express');
var router = express.Router();
var www = require('../bin/www');

var debug = require('debug')('stupid-remote:macro');

var sleep = require('sleep');

var lircNode = require('lirc_node');
lircNode.init();
lircNode.setSocket('/run/lirc/lircd-lirc0');

debug(lircNode.remotes);

/**
 * handle GET /aux request
 *
 * echo "tx 2F:82:20:00" | cec-client RPI -s -d 4
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_CYCLEWINDOWS" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 0.5
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_UP" && sleep 2
 * irsend -d /run/lirc/lircd-lirc0 SEND_ONCE "Samsung" "KEY_CYCLEWINDOWS" 
 *
 * www.cecUsb.sendCommand( 0x1F, 0x82, 0x20, 0x00 );
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
  
  www.cecUsb.sendCommand( 0x1F, 0x82, 0x20, 0x00 );
  sleep.sleep(4);
  
  lircNode.irsend.send_once('Samsung', 'KEY_CYCLEWINDOWS', function() {
    debug("Sent KEY_CYCLEWINDOWS");
    sleep.sleep(1);
    
    lircNode.irsend.send_once('Samsung', 'KEY_UP', function() {
      debug("Sent KEY_UP 1");
      sleep.sleep(1);
      
      lircNode.irsend.send_once('Samsung', 'KEY_UP', function() {
        debug("Sent KEY_UP 2");
        sleep.sleep(1);
        
        lircNode.irsend.send_once('Samsung', 'KEY_UP', function() {
          debug("Sent KEY_UP 3");
          sleep.sleep(1);
  
          lircNode.irsend.send_once('Samsung', 'KEY_UP', function() {
            debug("Sent KEY_UP 4");
            sleep.sleep(3);

            lircNode.irsend.send_once('Samsung', 'KEY_ENTER', function() {
              debug("Sent KEY_CYCLEWINDOWS");
            
              res.writeHead(200, {"Content-Type": "application/json"});
              var html = '{"status":"ok"}';
              res.end(html);
  
            });
          });
        });
      });
    });
  });
});

module.exports = router;
