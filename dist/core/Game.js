"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var PIXI = __importStar(require("pixi.js"));
var Tank_1 = require("./Tank");
var Hay_1 = require("./Hay");
var Wall_1 = require("./Wall");
var Game = /** @class */ (function () {
    function Game() {
        this.tanks = [];
        this.hays = [];
        this.walls = [];
        this.currentTankIndex = 0;
        this.app = new PIXI.Application({ width: 50 * 35, height: 50 * 35 });
        document.body.appendChild(this.app.view);
        this.generateMap();
        this.setupTanks();
        this.addKeyboardListeners();
    }
    Game.prototype.generateMap = function () {
        for (var i = 0; i < 25; i++) {
            var hay = new Hay_1.Hay(this.randomPosition());
            this.hays.push(hay);
            this.app.stage.addChild(hay.sprite);
        }
        for (var i = 0; i < 50; i++) {
            var wall = new Wall_1.Wall(this.randomPosition());
            this.walls.push(wall);
            this.app.stage.addChild(wall.sprite);
        }
    };
    Game.prototype.setupTanks = function () {
        var _this = this;
        this.tanks.push(new Tank_1.Tank('red', 10, 2));
        this.tanks.push(new Tank_1.Tank('blue', 20, 3));
        this.tanks.push(new Tank_1.Tank('green', 25, 1));
        this.tanks.forEach(function (tank) { return _this.app.stage.addChild(tank.sprite); });
    };
    Game.prototype.addKeyboardListeners = function () {
        var _this = this;
        window.addEventListener('keydown', function (e) {
            var currentTank = _this.tanks[_this.currentTankIndex];
            switch (e.code) {
                case 'ArrowUp':
                    currentTank.move(0, -35);
                    break;
                case 'ArrowDown':
                    currentTank.move(0, 35);
                    break;
                case 'ArrowLeft':
                    currentTank.move(-35, 0);
                    break;
                case 'ArrowRight':
                    currentTank.move(35, 0);
                    break;
                case 'Space':
                    currentTank.fire(_this.app.stage, _this.hays);
                    break;
                case 'KeyT':
                    _this.currentTankIndex = (_this.currentTankIndex + 1) % _this.tanks.length;
                    break;
            }
            _this.checkCollisions(currentTank);
        });
    };
    Game.prototype.randomPosition = function () {
        return {
            x: Math.floor(Math.random() * 50) * 35,
            y: Math.floor(Math.random() * 50) * 35
        };
    };
    Game.prototype.checkCollisions = function (tank) {
        var _this = this;
        var tankBounds = tank.sprite.getBounds(true);
        var tankRect = new PIXI.Rectangle(tankBounds.x, tankBounds.y, tankBounds.width, tankBounds.height);
        this.walls.forEach(function (wall) {
            var wallBounds = wall.sprite.getBounds(true);
            var wallRect = new PIXI.Rectangle(wallBounds.x, wallBounds.y, wallBounds.width, wallBounds.height);
            if (_this.isCollision(tankRect, wallRect)) {
                tank.undoMove();
            }
        });
        this.hays.forEach(function (hay) {
            var hayBounds = hay.sprite.getBounds(true);
            var hayRect = new PIXI.Rectangle(hayBounds.x, hayBounds.y, hayBounds.width, hayBounds.height);
            if (_this.isCollision(tankRect, hayRect)) {
                tank.undoMove();
            }
        });
    };
    Game.prototype.isCollision = function (rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    };
    return Game;
}());
exports.Game = Game;
