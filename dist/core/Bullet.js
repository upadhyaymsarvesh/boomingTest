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
exports.Bullet = void 0;
var PIXI = __importStar(require("pixi.js"));
var Bullet = /** @class */ (function () {
    function Bullet(x, y, damage) {
        this.speed = 10;
        this.sprite = PIXI.Sprite.from('assets/bullet.png');
        this.sprite.x = x;
        this.sprite.y = y;
        this.sprite.width = 5;
        this.sprite.height = 5;
        this.damage = damage;
    }
    Bullet.prototype.move = function () {
        this.sprite.y -= this.speed;
    };
    Bullet.prototype.checkCollision = function (hays) {
        var _this = this;
        var bulletBounds = this.sprite.getBounds(true);
        var bulletRect = new PIXI.Rectangle(bulletBounds.x, bulletBounds.y, bulletBounds.width, bulletBounds.height);
        hays.forEach(function (hay) {
            var hayBounds = hay.sprite.getBounds(true);
            var hayRect = new PIXI.Rectangle(hayBounds.x, hayBounds.y, hayBounds.width, hayBounds.height);
            if (_this.isCollision(bulletRect, hayRect)) {
                hay.takeDamage(_this.damage);
                _this.sprite.visible = false;
            }
        });
    };
    Bullet.prototype.isCollision = function (rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    };
    return Bullet;
}());
exports.Bullet = Bullet;
