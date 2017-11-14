function askToConfirm(conv, resolve, name) {
    var question = {
        text: 'Your nick name is "' + name + '", right?',
        quickReplies: ['YES', 'NO'],
    };

    var answer = (payload, convo) => {
        console.log("Ask again!");
        askToConfirm(conv, resolve, name);
    };

    var callbacks = [
        {
            event: 'attachment',
            callback: (payload) => {
                console.log("Ask again!");
                askToConfirm(conv, resolve, name);
            }
        },
        {
            event: 'postback',
            callback: (payload) => {
                console.log("Ask again!");
                askToConfirm(conv, resolve, name);
            }
        },
        {
            event: 'quick_reply',
            callback: (payload, convo) => {
                // console.log(payload);
                switch (payload.message.quick_reply.payload) {
                    case 'BOOTBOT_QR_YES':
                        // convo.say("You say yes!");
                        resolve(name);
                        break;
                    case 'BOOTBOT_QR_NO':
                        // convo.say("You say no!");
                        askNamePlayer(conv, resolve);
                        break;
                }

            }
        },
    ];

    var options = {
        typing: true // Send a typing indicator before asking the question
    };

    conv.ask(question, answer, callbacks, options);
}

function askNamePlayer(conv, resolve) {
    var question = "What's your nickname?";

    var answer = (payload, convo) => {
        // console.log(payload);
        console.log("Name of player is ", payload.message.text);
        askToConfirm(conv, resolve, payload.message.text);
    };

    var callbacks = [
        {
            event: 'attachment',
            callback: (payload) => {
                console.log("Ask again!");
                askNamePlayer(conv, resolve);
            }
        },
        {
            event: 'postback',
            callback: (payload) => {
                console.log("Ask again!");
                askNamePlayer(conv, resolve);
            }
        },
        {
            event: 'quick_reply',
            callback: (payload) => {
                console.log("Ask again!");
                askNamePlayer(conv, resolve);
            }
        },
    ];

    var options = {
        typing: true // Send a typing indicator before asking the question
    };

    conv.ask(question, answer, callbacks, options);
}

async function askName(chat) {
    return new Promise(async (resolve, reject) => {
        console.log('Ask name of the new player!');
        chat.conversation((conv) => {
            askNamePlayer(conv, resolve);
        });
    });
}

module.exports.askName = askName;