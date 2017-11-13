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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function registerAction(bot) {
    var _this = this;

    bot.on('message', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(payload, chat) {
            var sender, name, player, text;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            sender = payload.sender.id;

                            if (_app.playerManager.isExist(sender)) {
                                _context.next = 12;
                                break;
                            }

                            console.log(sender, 'is a new player!');
                            _context.next = 5;
                            return (0, _event.askName)(chat);

                        case 5:
                            name = _context.sent;

                            // console.log(sender, name);
                            chat.say("Wait for instructions from the game manager");
                            player = new _Player2.default(sender, name);
                            // console.log(player);

                            _app.playerManager.addPlayer(player);
                            console.log(_app.playerManager.getPlayers());
                            _context.next = 14;
                            break;

                        case 12:
                            text = payload.message.text;

                            chat.say(text);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
}
//# sourceMappingURL=registerAction.js.map