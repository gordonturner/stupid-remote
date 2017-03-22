var express = require('express');
var router = express.Router();
var www = require('../bin/www');

var lircNode = require('lirc_node');
lircNode.init();

var debug = require('debug')('stupid-remote:lirc');

/**
 * handle GET /tvOn request
 *
 *  irsend SEND_ONCE JVC-RM-AJ777 KEY_POWER
 *
 * @swagger
 * /lirc/switchToggle:
 *   get:
 *     tags:
 *       - Switch Toggle
 *     description: Toggles AV Switch power
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Toggles AV Switch power
 */
router.get('/switchToggle', function (req, res, next) {
  debug('called switchToggle');

  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_POWER', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });  
});

/**
 * handle GET /nes request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_1
 *
 * @swagger
 * /lirc/nes:
 *   get:
 *     tags:
 *       - Switch Control
 *     description: Change input to NES
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully change input to NES
 */
router.get('/nes', function (req, res, next) {
  debug('called nes');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_1', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


/**
 * handle GET /snes request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_2
 *
 * @swagger
 * /lirc/snes:
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
router.get('/snes', function (req, res, next) {
  debug('called snes');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_2', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


/**
 * handle GET /n64 request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_3
 *
 * @swagger
 * /lirc/n64:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to n64
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to n64
 */
router.get('/n64', function (req, res, next) {
  debug('called n64');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_3', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


/**
 * handle GET /gameCube request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_4
 *
 * @swagger
 * /lirc/gameCube:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to gameCube
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to gameCube
 */
router.get('/gameCube', function (req, res, next) {
  debug('called gameCube');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_4', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


/**
 * handle GET /ps1 request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_4
 *
 * @swagger
 * /lirc/ps1:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to ps1
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to ps1
 */
router.get('/ps1', function (req, res, next) {
  debug('called ps1');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_5', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


/**
 * handle GET /ps2 request
 *
 * irsend SEND_ONCE JVC-RM-AJ777 KEY_4
 *
 * @swagger
 * /lirc/ps2:
 *   get:
 *     tags:
 *       - Switch Active Device Control
 *     description: Change input to ps2
 *     produces:
 *       - application/json
 *     parameters:
 *     responses:
 *       200:
 *         description: Successfully changed input to ps2
 */
router.get('/ps2', function (req, res, next) {
  debug('called ps2');
  
  lircNode.irsend.send_once('JVC-RM-AJ777', 'KEY_6', function() {
    console.log("Sent switch power command!");
    
    res.writeHead(200, {"Content-Type": "application/json"});
    var html = '{"status":"ok"}';
    res.end(html);
  });
});


module.exports = router;
