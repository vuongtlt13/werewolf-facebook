'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.bot = exports.playerManager = undefined;

var _registerAction = require('./registerAction');

var _PlayerManager = require('./PlayerManager');

var _PlayerManager2 = _interopRequireDefault(_PlayerManager);

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = require('node-env-file');

var BootBot = require('bootbot');

var playerManager = exports.playerManager = new _PlayerManager2.default();

var express = require('express');
var bodyParser = require('body-parser');

var bot = exports.bot = new BootBot({
    accessToken: 'EAADyUFgrJA4BAFwDILiDLQawohPtZAxIhFzfB0Nijnv44sgsEN5aCskQTLiL7NgL6ZBdO1LHlaSRTDfazbIDZCFS181Rymic0SJHyffe7S3go0i65Ru0Wnc8gokjTZBSfBg8yoz10xi030T6g0nncUaQXfkzXDfZAVCB9evPXTgZDZD',
    verifyToken: 'token',
    appSecret: '136216e4f5392be84caa113d8a2b157b'
});

var app = bot.app;

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getallplayer', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var listPlayer = playerManager.getPlayers();
    res.send(JSON.stringify(listPlayer) + "\n");
    res.end();
});

app.get('/deleteallplayer', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    playerManager.reset();
    console.log(playerManager);
    var msg = { status: "success" };
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/sendmessage', function (req, res) {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    bot.say(req.body.id, 'In this game, you are "' + req.body.character + '"');
    var msg = { status: "success" };
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/notify', function (req, res) {
    console.log(req.body);
    playerManager.sendEach(req.body.msg);
    res.setHeader('Content-Type', 'application/json');
    var msg = { status: "success" };
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/postallplayer', function (req, res) {
    console.log(req.params);
});

app.post('/addplayer', function (req, res) {
    console.log("REQUEST POST: -------------------", req.body);
    var player = new _Player2.default(req.body.id, req.body.name);
    playerManager.addPlayer(player);
    res.setHeader('Content-Type', 'application/json');
    var msg = { status: "success" };
    res.send(JSON.stringify(msg) + "\n");
    res.end();
    // console.log(playerManager);
});

(0, _registerAction.registerAction)(bot);

env(__dirname + '/.env');

bot.start(process.env.PORT);
//# sourceMappingURL=app.js.map