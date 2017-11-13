'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('./Player');

var _Player2 = _interopRequireDefault(_Player);

var _app = require('./app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerManager = function () {
    function PlayerManager() {
        _classCallCheck(this, PlayerManager);

        this.listPlayer = [];
    }

    _createClass(PlayerManager, [{
        key: 'getPlayers',
        value: function getPlayers() {
            return this.listPlayer;
        }
    }, {
        key: 'isExist',
        value: function isExist(sender_id) {
            for (var i = 0; i < this.listPlayer.length; i++) {
                if (this.listPlayer[i].getID() === sender_id) return true;
            }
            return false;
        }
    }, {
        key: 'addPlayer',
        value: function addPlayer(player) {
            this.listPlayer.push(player);
        }
    }, {
        key: 'getNumberOfPlayer',
        value: function getNumberOfPlayer() {
            return this.listPlayer.length;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this.listPlayer = [];
        }
    }, {
        key: 'sendEach',
        value: function sendEach(msg) {
            this.listPlayer.forEach(function (player) {
                _app.bot.say(player.getID(), msg);
            });
        }
    }]);

    return PlayerManager;
}();

module.exports = PlayerManager;