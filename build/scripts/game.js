(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _GameState = require("states/GameState");

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Phaser$Game) {
	_inherits(Game, _Phaser$Game);

	function Game() {
		_classCallCheck(this, Game);

		var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, "100%", "100%", Phaser.AUTO, 'content', undefined));

		_this.state.add('GameState', _GameState2.default, false);
		_this.state.start('GameState');
		return _this;
	}

	return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ScoreManager = require('managers/ScoreManager');

var _ScoreManager2 = _interopRequireDefault(_ScoreManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by josh on 2016-04-09.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var CollisionManager = function (_Phaser$Physics$Arcad) {
    _inherits(CollisionManager, _Phaser$Physics$Arcad);

    function CollisionManager(game) {
        _classCallCheck(this, CollisionManager);

        var _this = _possibleConstructorReturn(this, (CollisionManager.__proto__ || Object.getPrototypeOf(CollisionManager)).call(this, game));

        _this.collidables = [];
        _this.scoreManager = new _ScoreManager2.default(game, Phaser);
        return _this;
    }

    _createClass(CollisionManager, [{
        key: 'setPlayer',
        value: function setPlayer(player) {
            this.player = player;
        }
    }, {
        key: 'addCollidable',
        value: function addCollidable(collidable) {
            this.collidables.push(collidable);
        }
    }, {
        key: 'update',
        value: function update() {
            var _this2 = this;

            this.scoreManager.update();
            this.collidables.forEach(function (collidable) {
                _this2.game.physics.arcade.collide(_this2.player, collidable, _this2.playerCollision, _this2.processCollision, _this2);
            });
        }
    }, {
        key: 'processCollision',
        value: function processCollision(player, collidable) {
            return !collidable.respawning;
        }
    }, {
        key: 'playerCollision',
        value: function playerCollision(player, collidable) {
            if (collidable.respawning) return;
            if (player.size < collidable.size) {
                player.visible = false;
                player.body = false;
                this.scoreManager.gameOver();
                return;
            }
            this.scoreManager.addScore(collidable.size);
            player.growBy(collidable.size);
            collidable.respawn(undefined, undefined, 2000, player.size * 1000, player.size * 1000);
        }
    }]);

    return CollisionManager;
}(Phaser.Physics.Arcade);

exports.default = CollisionManager;

},{"managers/ScoreManager":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by josh on 2016-04-09.
 */

var CountdownManager = function () {
    function CountdownManager(game) {
        _classCallCheck(this, CountdownManager);

        this.game = game;

        this.text3 = game.add.text(this.game.world.centerX, this.game.world.centerY, "3", { align: "center",
            font: "60px Arial",
            fill: "#ffffff" });
        this.text2 = game.add.text(this.game.world.centerX, this.game.world.centerY, "2", { align: "center",
            font: "60px Arial",
            fill: "#ffffff" });
        this.text1 = game.add.text(this.game.world.centerX, this.game.world.centerY, "1", { align: "center",
            font: "60px Arial",
            fill: "#ffffff" });
        this.textgo = game.add.text(this.game.world.centerX, this.game.world.centerY, "Go!", { align: "center",
            font: "60px Arial",
            fill: "#ffffff" });

        this.text3.visible = false;
        this.text2.visible = false;
        this.text1.visible = false;
        this.textgo.visible = false;
    }

    _createClass(CountdownManager, [{
        key: "start",
        value: function start() {
            var _this = this;

            setTimeout(function () {
                _this.textgo.visible = false;
            }, 4000);

            setTimeout(function () {
                _this.text1.visible = false;
                _this.textgo.visible = true;
            }, 3000);

            setTimeout(function () {
                _this.text2.visible = false;
                _this.text1.visible = true;
            }, 2000);

            setTimeout(function () {
                _this.text3.visible = false;
                _this.text2.visible = true;
            }, 1000);

            this.text3.visible = true;
        }
    }]);

    return CountdownManager;
}();

exports.default = CountdownManager;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by josh on 2016-04-09.
 */

var ScoreManager = function () {
    function ScoreManager(game) {
        _classCallCheck(this, ScoreManager);

        this.text = game.add.text(game.world.x + 25, game.world.y + 25, "Score: 0", { font: "20px Arial", fill: "#ffffff" });
        this.game = game;
        this.score = 0;
        this.isGameOver = false;
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }

    _createClass(ScoreManager, [{
        key: "update",
        value: function update() {
            if (this.isGameOver && this.spaceKey.isDown) {
                this.game.state.restart();
            }
        }
    }, {
        key: "addScore",
        value: function addScore(score) {
            this.score += Math.round(score * 1000);
            this.text.setText("Score: " + this.score);

            this.checkIfWon();
        }
    }, {
        key: "checkIfWon",
        value: function checkIfWon() {
            if (this.score > 3500) {
                this.isGameOver = true;
                this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY - 200, "Congratulations! You've eaten to the size of a galaxy!", { align: "center",
                    font: "60px Arial",
                    fill: "#ffffff" });
            }
        }
    }, {
        key: "gameOver",
        value: function gameOver() {
            this.isGameOver = true;
            this.game.add.text(this.game.world.centerX - 200, this.game.world.centerY - 200, "Game Over \n Score: " + this.score, { align: "center",
                font: "60px Arial",
                fill: "#ffffff" });

            this.game.add.text(this.game.world.centerX - 250, this.game.world.centerY, "Press Spacebar to Restart", { align: "center",
                font: "40px Arial",
                fill: "#ffffff" });

            this.game.add.text(this.game.world.centerX - 400, this.game.world.centerY + 200, "(Use arrow keys to move, try to eat things smaller than you to get as big as possible)", { align: "center",
                font: "20px Arial",
                fill: "#ffffff" });
        }
    }]);

    return ScoreManager;
}();

exports.default = ScoreManager;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by josh on 2016-04-09.
 */

var WindowManager = function (_Phaser$ScaleManager) {
    _inherits(WindowManager, _Phaser$ScaleManager);

    function WindowManager(game, width, height) {
        _classCallCheck(this, WindowManager);

        var _this = _possibleConstructorReturn(this, (WindowManager.__proto__ || Object.getPrototypeOf(WindowManager)).call(this, game, width, height));

        _this.manageWindow();
        _this.sprites = [];
        _this.respawnSprites = [];
        _this.EDGE = 100;
        return _this;
    }

    _createClass(WindowManager, [{
        key: "manageWindow",
        value: function manageWindow() {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.setResizeCallback(this.adjust, this);
        }
    }, {
        key: "update",
        value: function update() {
            this.screenWrap();
            this.respawnScreenWrap();
        }
    }, {
        key: "adjust",
        value: function adjust() {
            this.game.scale.setGameSize(window.innerWidth, window.innerHeight);
        }
    }, {
        key: "addSprite",
        value: function addSprite(sprite) {
            this.sprites.push(sprite);
        }
    }, {
        key: "addRespawnSprite",
        value: function addRespawnSprite(sprite) {
            this.respawnSprites.push(sprite);
        }

        /**
         * When a sprite leaves the screen, call their respawn function instead at the edge of the map.
         */

    }, {
        key: "respawnScreenWrap",
        value: function respawnScreenWrap() {
            var _this2 = this;

            this.respawnSprites.forEach(function (sprite) {
                if (!sprite.body) return;
                if (sprite.x < 0 - _this2.EDGE || sprite.x > _this2.game.width + _this2.EDGE) {
                    sprite.respawn(0, undefined, 0, 1, 0);
                }

                if (sprite.y < 0 - _this2.EDGE || sprite.y > _this2.game.height + _this2.EDGE) {
                    sprite.respawn(0, undefined, 0, 1, 0);
                }
            });
        }
    }, {
        key: "screenWrap",
        value: function screenWrap() {
            var _this3 = this;

            this.sprites.forEach(function (sprite) {
                if (sprite.x < 0) {
                    sprite.x = _this3.game.width;
                } else if (sprite.x > _this3.game.width) {
                    sprite.x = 0;
                }

                if (sprite.y < 0) {
                    sprite.y = _this3.game.height;
                } else if (sprite.y > _this3.game.height) {
                    sprite.y = 0;
                }
            });
        }
    }]);

    return WindowManager;
}(Phaser.ScaleManager);

exports.default = WindowManager;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by josh on 2016-04-07.
 */

var Collidable = function (_Phaser$Sprite) {
    _inherits(Collidable, _Phaser$Sprite);

    function Collidable(game, sprite, size, maxSizeModifier, x, y) {
        _classCallCheck(this, Collidable);

        var _this = _possibleConstructorReturn(this, (Collidable.__proto__ || Object.getPrototypeOf(Collidable)).call(this, game, x || game.world.randomX, y || game.world.randomY, sprite));

        _this.maxSizeModifier = maxSizeModifier;

        _this.sizeModifier(undefined, undefined, function (modifiedSize) {
            _this.size = modifiedSize + size;
            _this.scale.setTo(_this.size, _this.size);
        });

        _this.respawning = false;

        _this.anchor.setTo(0.5, 0.5);
        game.physics.enable(_this, Phaser.Physics.ARCADE);

        // set collision box sizes to be smaller
        _this.body.width *= 0.8;
        _this.body.height *= 0.8;
        return _this;
    }

    _createClass(Collidable, [{
        key: "respawn",
        value: function respawn() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.game.world.randomX;

            var _this2 = this;

            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.game.world.randomY;
            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

            if (this.respawning) return;
            this.respawning = true;

            var savedBody = this.body;
            this.body = null;
            this.visible = false;

            savedBody.x = x;
            savedBody.y = y;
            savedBody.acceleration.x = 0;
            savedBody.acceleration.y = 0;

            setTimeout(function () {
                _this2.body = savedBody;
                _this2.visible = true;
                _this2.respawning = false;
            }, timeout);
        }
    }, {
        key: "sizeModifier",
        value: function sizeModifier() {
            var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.maxSizeModifier;
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var cb = arguments[2];

            cb(Math.floor(Math.random() * (max - min) + min) / 1000);
        }
    }]);

    return Collidable;
}(Phaser.Sprite);

exports.default = Collidable;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collidable2 = require('objects/Collidable');

var _Collidable3 = _interopRequireDefault(_Collidable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by josh on 2016-04-07.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Fish = function (_Collidable) {
    _inherits(Fish, _Collidable);

    function Fish(game) {
        _classCallCheck(this, Fish);

        var edge = 0;
        var x = getSpawnLocation(game, edge);

        var _this = _possibleConstructorReturn(this, (Fish.__proto__ || Object.getPrototypeOf(Fish)).call(this, game, 'roundfish', 0.0225, 30, x, undefined));

        _this.edge = edge;
        _this.goingLeft = x !== _this.edge;
        _this.respawning = false;
        _this.body.velocity.x = _this.getVelocity();

        // set collision box sizes to be smaller (first doing *= 0.7 in collidable)
        _this.body.width *= 0.9;
        _this.body.height *= 0.9;
        return _this;
    }

    _createClass(Fish, [{
        key: 'update',
        value: function update() {
            // gets called automatically by World.update()
            this.chooseDirection();
        }
    }, {
        key: 'chooseDirection',
        value: function chooseDirection() {
            if (!this.body) return;
            if (this.body.velocity.x > 0) {
                this.scale.x = this.size;
            } else {
                this.scale.x = -this.size;
            }
        }
    }, {
        key: 'respawn',
        value: function respawn(x) {
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.game.world.randomY;
            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

            var _this2 = this;

            var max = arguments[3];
            var min = arguments[4];

            if (this.respawning) return;
            this.respawning = true;
            this.visible = false;

            var savedBody = this.body;

            this.sizeModifier(max, min, function (modifiedSize) {
                _this2.size += modifiedSize;
                _this2.scale.setTo(_this2.size, _this2.size);
            });

            getSpawnLocation(this.game, this.edge, function (spawnLocation) {
                _this2.goingLeft = spawnLocation !== _this2.edge;
                savedBody.acceleration.x = 0;
                savedBody.acceleration.y = 0;
                savedBody.x = spawnLocation;
                savedBody.y = y;
                savedBody.velocity.x = 0;
                savedBody.velocity.y = 0;

                setTimeout(function () {
                    _this2.body = savedBody;
                    _this2.body.velocity.x = _this2.getVelocity();
                    _this2.visible = true;
                    _this2.respawning = false;
                }, timeout);
            });
        }
    }, {
        key: 'getVelocity',
        value: function getVelocity() {
            return this.goingLeft ? Math.floor(Math.random() * 150 - 200) : Math.floor(Math.random() * 150 + 50);
        }
    }]);

    return Fish;
}(_Collidable3.default);

var getSpawnLocation = function getSpawnLocation(game, edge, cb) {
    var xSpawnChoices = [edge, game.world.width - edge];
    var xSpawnLocation = xSpawnChoices[Math.floor(Math.random() * xSpawnChoices.length)];
    if (cb) {
        cb(xSpawnLocation);
    }
    return xSpawnLocation;
};

exports.default = Fish;

},{"objects/Collidable":6}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collidable2 = require('objects/Collidable');

var _Collidable3 = _interopRequireDefault(_Collidable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by josh on 2016-04-07.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Food = function (_Collidable) {
    _inherits(Food, _Collidable);

    function Food(game) {
        _classCallCheck(this, Food);

        var location = getSpawnLocation(game);

        var _this = _possibleConstructorReturn(this, (Food.__proto__ || Object.getPrototypeOf(Food)).call(this, game, 'bubble', 0.005, 0, location.x, location.y));

        _this.movingHorizontally = Math.random() > 0.5;
        _this.movingVertically = Math.random() > 0.5;

        _this.goingLeft = location.x !== 0;
        _this.goingUp = location.y !== 0;
        return _this;
    }

    _createClass(Food, [{
        key: 'update',
        value: function update() {
            // gets called automatically by World.update()
            this.floatAround();
        }
    }, {
        key: 'floatAround',
        value: function floatAround() {
            if (!this.body) return;

            if (this.movingHorizontally) {
                this.body.velocity.x = this.getVelocity(this.goingLeft);
            }

            if (this.movingVertically) {
                this.body.velocity.y = this.getVelocity(this.goingUp);
            }
        }
    }, {
        key: 'respawn',
        value: function respawn(x, y) {
            var _this2 = this;

            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;

            if (this.respawning) return;
            this.respawning = true;

            var savedBody = this.body;
            this.body = null;
            this.visible = false;

            getSpawnLocation(this.game, function (spawnLocation) {
                savedBody.x = spawnLocation.x;
                savedBody.y = spawnLocation.y;
                savedBody.acceleration.x = 0;
                savedBody.acceleration.y = 0;
                _this2.body = savedBody;

                setTimeout(function () {
                    _this2.visible = true;
                    _this2.respawning = false;
                }, timeout);
            });
        }
    }, {
        key: 'getVelocity',
        value: function getVelocity(condition) {
            return condition ? Math.floor(Math.random() * 100 - 150) : Math.floor(Math.random() * 100 + 50);
        }
    }]);

    return Food;
}(_Collidable3.default);

var getSpawnLocation = function getSpawnLocation(game, cb) {
    var xSpawnChoices = [0, game.world.width];
    var x = xSpawnChoices[Math.floor(Math.random() * xSpawnChoices.length)];
    var ySpawnChoices = [0, game.world.height];
    var y = ySpawnChoices[Math.floor(Math.random() * ySpawnChoices.length)];
    if (cb) {
        cb({ x: x, y: y });
    }
    return { x: x, y: y };
};

exports.default = Food;

},{"objects/Collidable":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collidable2 = require('objects/Collidable');

var _Collidable3 = _interopRequireDefault(_Collidable2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by josh on 2016-04-07.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Jellyfish = function (_Collidable) {
    _inherits(Jellyfish, _Collidable);

    function Jellyfish(game) {
        _classCallCheck(this, Jellyfish);

        var edge = 0;
        var y = getSpawnLocation(game, edge);

        var _this = _possibleConstructorReturn(this, (Jellyfish.__proto__ || Object.getPrototypeOf(Jellyfish)).call(this, game, 'jellyfish', 0.0225, 30, undefined, y));

        _this.edge = edge;
        _this.goingUp = y !== _this.edge;
        _this.respawning = false;
        _this.body.velocity.y = _this.getVelocity();
        return _this;
    }

    _createClass(Jellyfish, [{
        key: 'update',
        value: function update() {
            // gets called automatically by World.update()
            this.chooseDirection();
        }
    }, {
        key: 'chooseDirection',
        value: function chooseDirection() {
            if (!this.body) return;
            if (this.body.velocity.y > 0) {
                this.scale.y = -this.size;
            } else {
                this.scale.y = this.size;
            }
        }
    }, {
        key: 'respawn',
        value: function respawn(x, y) {
            var timeout = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 350;

            var _this2 = this;

            var max = arguments[3];
            var min = arguments[4];

            if (this.respawning) return;
            this.respawning = true;
            this.visible = false;

            var savedBody = this.body;

            getSpawnLocation(this.game, this.edge, function (spawnLocation, spawn_x) {
                _this2.goingUp = spawnLocation !== _this2.edge;
                _this2.sizeModifier(max, min, function (modifiedSize) {
                    _this2.size += modifiedSize;
                    _this2.scale.setTo(_this2.size, _this2.size);
                });

                savedBody.acceleration.x = 0;
                savedBody.acceleration.y = 0;
                savedBody.x = spawn_x;
                savedBody.y = spawnLocation;
                savedBody.velocity.x = 0;
                savedBody.velocity.y = 0;

                setTimeout(function () {
                    _this2.body.velocity.y = _this2.getVelocity();
                    _this2.body = savedBody;
                    _this2.visible = true;
                    _this2.respawning = false;
                }, timeout);
            });
        }
    }, {
        key: 'getVelocity',
        value: function getVelocity() {
            return this.goingUp ? Math.floor(Math.random() * 100 - 150) : Math.floor(Math.random() * 100 + 50);
        }
    }]);

    return Jellyfish;
}(_Collidable3.default);

var getSpawnLocation = function getSpawnLocation(game, edge, cb) {
    var ySpawnChoices = [edge, game.world.height - edge];
    var ySpawnLocation = ySpawnChoices[Math.floor(Math.random() * ySpawnChoices.length)];
    var x = game.world.randomX;
    if (cb) {
        cb(ySpawnLocation, x);
    }
    return ySpawnLocation;
};

exports.default = Jellyfish;

},{"objects/Collidable":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by josh on 2016-04-07.
 */

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, game, x, y, 'kraken'));

        _this.size = 0.02;
        _this.scale.setTo(_this.size, _this.size);
        _this.cursors = game.input.keyboard.createCursorKeys();
        _this.anchor.setTo(0.5, 0.5);

        //  We need to enable physics on the player
        game.physics.enable(_this, Phaser.Physics.ARCADE);

        return _this;
    }

    _createClass(Player, [{
        key: 'update',
        value: function update() {
            // gets called automatically by World.update()
            this.handleKeyboard();
            this.handleMomentum();
        }
    }, {
        key: 'handleMomentum',
        value: function handleMomentum() {
            if (!this.body) return;

            if (this.body.velocity.x > 0) {
                this.body.velocity.x -= 4;
            } else if (this.body.velocity.x < 0) {
                this.body.velocity.x += 4;
            }

            if (this.body.velocity.y > 0) {
                this.body.velocity.y -= 4;
            } else if (this.body.velocity.y < 0) {
                this.body.velocity.y += 4;
            }

            this.body.acceleration = 0;
        }
    }, {
        key: 'handleKeyboard',
        value: function handleKeyboard() {
            if (!this.body) return;

            if (this.cursors.left.isDown) {
                this.body.angularVelocity = this.body.angularVelocity > -200 ? this.body.angularVelocity - 8 : this.body.angularVelocity;
            } else if (this.cursors.right.isDown) {
                this.body.angularVelocity = this.body.angularVelocity < 200 ? this.body.angularVelocity + 8 : this.body.angularVelocity;
            } else {
                this.body.angularVelocity = 0;
            }

            if (this.cursors.up.isDown) {
                var tempVelocity = this.game.physics.arcade.velocityFromAngle(this.angle + 90, 8);
                this.body.velocity.x += tempVelocity.x;
                this.body.velocity.y += tempVelocity.y;
            } else if (this.cursors.down.isDown) {
                var _tempVelocity = this.game.physics.arcade.velocityFromAngle(this.angle + 90, 5);
                this.body.velocity.x -= _tempVelocity.x;
                this.body.velocity.y -= _tempVelocity.y;
            }
        }

        /**
         * Grow by a fraction of the size of the sprite eaten
         * @param eaten
         */

    }, {
        key: 'growBy',
        value: function growBy(eaten) {
            this.size = this.size + eaten / 10;
            this.scale.setTo(this.size, this.size);
        }
    }]);

    return Player;
}(Phaser.Sprite);

exports.default = Player;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _WindowManager = require('managers/WindowManager');

var _WindowManager2 = _interopRequireDefault(_WindowManager);

var _CollisionManager = require('managers/CollisionManager');

var _CollisionManager2 = _interopRequireDefault(_CollisionManager);

var _CountdownManager = require('managers/CountdownManager');

var _CountdownManager2 = _interopRequireDefault(_CountdownManager);

var _Food = require('objects/Food');

var _Food2 = _interopRequireDefault(_Food);

var _Fish = require('objects/Fish');

var _Fish2 = _interopRequireDefault(_Fish);

var _Jellyfish = require('objects/Jellyfish');

var _Jellyfish2 = _interopRequireDefault(_Jellyfish);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GameState = function (_Phaser$State) {
	_inherits(GameState, _Phaser$State);

	function GameState() {
		_classCallCheck(this, GameState);

		return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
	}

	_createClass(GameState, [{
		key: 'preload',
		value: function preload() {
			this.loadAssets();
			// this.game.stage.backgroundColor = "#f5f5f5";

			this.windowManager = new _WindowManager2.default(this.game, "100%", "100%");
		}
	}, {
		key: 'create',
		value: function create() {
			var background = this.game.add.sprite(0, 0, 'background');
			background.scale.setTo(0.7, 0.7);

			this.collisionManager = new _CollisionManager2.default(this.game);
			this.generateFood();
			this.generateFish();
			this.generateJellyfish();
			this.generatePlayer();
		}
	}, {
		key: 'update',
		value: function update() {
			this.collisionManager.update();
			this.windowManager.update();
		}
	}, {
		key: 'loadAssets',
		value: function loadAssets() {
			this.game.load.image('kraken', './assets/kraken.png');
			this.game.load.image('bubble', './assets/bubble.png');
			this.game.load.image('roundfish', './assets/roundfish.png');
			this.game.load.image('jellyfish', './assets/talljelly.png');
			this.game.load.image('background', './assets/background.png');
		}
	}, {
		key: 'generateFood',
		value: function generateFood() {
			for (var i = 0; i < 10; i++) {
				var food = new _Food2.default(this.game);
				this.game.add.existing(food);
				this.collisionManager.addCollidable(food);
				this.windowManager.addSprite(food);
			}
		}
	}, {
		key: 'generateFish',
		value: function generateFish() {
			for (var i = 0; i < 8; i++) {
				var fish = new _Fish2.default(this.game);
				this.game.add.existing(fish);
				this.collisionManager.addCollidable(fish);
				this.windowManager.addRespawnSprite(fish);
			}
		}
	}, {
		key: 'generateJellyfish',
		value: function generateJellyfish() {
			for (var i = 0; i < 5; i++) {
				var jellyfish = new _Jellyfish2.default(this.game);
				this.game.add.existing(jellyfish);
				this.collisionManager.addCollidable(jellyfish);
				this.windowManager.addRespawnSprite(jellyfish);
			}
		}
	}, {
		key: 'generatePlayer',
		value: function generatePlayer() {
			var _this2 = this;

			this.player = new _Player2.default(this.game, this.game.world.centerX, this.game.world.centerY);
			this.game.add.existing(this.player);

			// Gives the player 4 seconds to get going
			this.countdownManager = new _CountdownManager2.default(this.game);
			this.countdownManager.start();
			setTimeout(function () {
				_this2.collisionManager.setPlayer(_this2.player);
			}, 4000);
			this.windowManager.addSprite(this.player);
		}
	}]);

	return GameState;
}(Phaser.State);

exports.default = GameState;

},{"managers/CollisionManager":2,"managers/CountdownManager":3,"managers/WindowManager":5,"objects/Fish":7,"objects/Food":8,"objects/Jellyfish":9,"objects/Player":10}]},{},[1])
//# sourceMappingURL=game.js.map
