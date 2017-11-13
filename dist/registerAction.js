'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.registerAction = registerAction;

var _app = require('./app');

var _event = require('./event');

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerAction(bot) {
    bot.on('message', async function (payload, chat) {
        var sender = payload.sender.id;
        if (!_app.playerManager.isExist(sender)) {
            console.log(sender, 'is a new player!');
            var name = await (0, _event.askName)(chat);
            // console.log(sender, name);
            chat.say("Wait for instructions from the game manager");
            var player = new _Player2.default(sender, name);
            // console.log(player);
            _app.playerManager.addPlayer(player);
            console.log(_app.playerManager.getPlayers());
        } else {
            var text = payload.message.text;
            chat.say(text);
        }
    });
}