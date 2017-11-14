var {playerManager} = require('./app');
var {askName}  = require('./event');
var Player  = require('./Player');

function registerAction(bot) {
    bot.on('message', async (payload, chat) => {
        var sender = payload.sender.id;
        if (!playerManager.isExist(sender)) {
            console.log(sender, 'is a new player!');
            var name = await askName(chat);
            // console.log(sender, name);
            chat.say("Wait for instructions from the game manager");
            var player = new Player(sender, name);
            // console.log(player);
            playerManager.addPlayer(player);
            console.log(playerManager.getPlayers());
        } else {
            var text = payload.message.text;
            chat.say(text);
        }
    });
}

module.exports.registerAction = registerAction;