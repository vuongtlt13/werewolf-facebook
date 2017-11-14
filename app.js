var {registerAction} = require('./registerAction');
var PlayerManager = require('./PlayerManager');
var Player = require('./Player');

var BootBot = require('bootbot');

var playerManager = new PlayerManager();

var express = require('express');
var bodyParser = require('body-parser');


var bot = new BootBot({
    accessToken: 'EAADyUFgrJA4BAFwDILiDLQawohPtZAxIhFzfB0Nijnv44sgsEN5aCskQTLiL7NgL6ZBdO1LHlaSRTDfazbIDZCFS181Rymic0SJHyffe7S3go0i65Ru0Wnc8gokjTZBSfBg8yoz10xi030T6g0nncUaQXfkzXDfZAVCB9evPXTgZDZD',
    verifyToken: 'token',
    appSecret: '136216e4f5392be84caa113d8a2b157b'
});

let app = bot.app;

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.send('App is running...');
    res.end();
});

app.get('/getallplayer', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    let listPlayer = playerManager.getPlayers();
    res.send(JSON.stringify(listPlayer) + "\n");
    res.end();
});

app.get('/deleteallplayer', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    playerManager.reset();
    console.log(playerManager);
    let msg = {status: "success"};
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/sendmessage', function (req, res) {
    console.log(req.body);
    res.setHeader('Content-Type', 'application/json');
    bot.say(req.body.id, 'In this game, you are "' + req.body.character + '"');
    let msg = {status: "success"};
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/notify', function (req, res) {
    console.log(req.body);
    playerManager.sendEach(req.body.msg);
    res.setHeader('Content-Type', 'application/json');
    let msg = {status: "success"};
    res.send(JSON.stringify(msg) + "\n");
    res.end();
});

app.post('/postallplayer', function (req, res) {
    console.log(req.params);
});

app.post('/addplayer', function (req, res) {
    console.log("REQUEST POST: -------------------", req.body);
    let player = new Player(req.body.id, req.body.name);
    playerManager.addPlayer(player);
    res.setHeader('Content-Type', 'application/json');
    let msg = {status: "success"};
    res.send(JSON.stringify(msg) + "\n");
    res.end();
    // console.log(playerManager);
});

registerAction(bot);

bot.start();

module.exports.playerManager = playerManager;
module.exports.bot = bot;
