const {playerManager} = require('./app');
const {askName}  = require('./event');
const Player  = require('./Player');

function registerAction(bot) {
    bot.on('message', async (payload, chat) => {
        let sender = payload.sender.id;
        if (!playerManager.isExist(sender)) {
            console.log(sender, 'is a new player!');
            let name = await askName(chat);
            // console.log(sender, name);
            chat.say("Wait for instructions from the game manager");
            let player = new Player(sender, name);
            // console.log(player);
            playerManager.addPlayer(player);
            console.log(playerManager.getPlayers());
        } else {
            const text = payload.message.text;
            chat.say(text);
        }
    });
}

module.exports.registerAction = registerAction;