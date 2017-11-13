'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var askName = exports.askName = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(chat) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', new Promise(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(resolve, reject) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                console.log('Ask name of the new player!');
                                                chat.conversation(function (conv) {
                                                    askNamePlayer(conv, resolve);
                                                });

                                            case 2:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x2, _x3) {
                                return _ref2.apply(this, arguments);
                            };
                        }()));

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));

    return function askName(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function askToConfirm(conv, resolve, name) {
    var question = {
        text: 'Your nick name is "' + name + '", right?',
        quickReplies: ['YES', 'NO']
    };

    var answer = function answer(payload, convo) {
        console.log("Ask again!");
        askToConfirm(conv, resolve, name);
    };

    var callbacks = [{
        event: 'attachment',
        callback: function callback(payload) {
            console.log("Ask again!");
            askToConfirm(conv, resolve, name);
        }
    }, {
        event: 'postback',
        callback: function callback(payload) {
            console.log("Ask again!");
            askToConfirm(conv, resolve, name);
        }
    }, {
        event: 'quick_reply',
        callback: function callback(payload, convo) {
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
    }];

    var options = {
        typing: true // Send a typing indicator before asking the question
    };

    conv.ask(question, answer, callbacks, options);
}

function askNamePlayer(conv, resolve) {
    var question = "What's your nickname?";

    var answer = function answer(payload, convo) {
        // console.log(payload);
        console.log("Name of player is ", payload.message.text);
        askToConfirm(conv, resolve, payload.message.text);
    };

    var callbacks = [{
        event: 'attachment',
        callback: function callback(payload) {
            console.log("Ask again!");
            askNamePlayer(conv, resolve);
        }
    }, {
        event: 'postback',
        callback: function callback(payload) {
            console.log("Ask again!");
            askNamePlayer(conv, resolve);
        }
    }, {
        event: 'quick_reply',
        callback: function callback(payload) {
            console.log("Ask again!");
            askNamePlayer(conv, resolve);
        }
    }];

    var options = {
        typing: true // Send a typing indicator before asking the question
    };

    conv.ask(question, answer, callbacks, options);
}
//# sourceMappingURL=event.js.map