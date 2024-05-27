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
exports.Tank = void 0;
var PIXI = __importStar(require("pixi.js"));
var Bullet_1 = require("./Bullet");
var Tank = /** @class */ (function () {
    function Tank(color, damage, bullets) {
        this.dx = 0;
        this.dy = 0;
        this.color = color;
        this.damage = damage;
        this.bullets = bullets;
        this.sprite = PIXI.Sprite.from("assets/".concat(color, "-tank.png"));
        this.sprite.x = Math.random() * 50 * 35;
        this.sprite.y = Math.random() * 50 * 35;
        this.sprite.width = 35;
        this.sprite.height = 35;
    }
    Tank.prototype.move = function (dx, dy) {
        this.dx = dx;
        this.dy = dy;
        this.sprite.x += dx;
        this.sprite.y += dy;
    };
    Tank.prototype.undoMove = function () {
        this.sprite.x -= this.dx;
        this.sprite.y -= this.dy;
        this.dx = 0;
        this.dy = 0;
    };
    Tank.prototype.fire = function (stage, hays) {
        for (var i = 0; i < this.bullets; i++) {
            var bullet = new Bullet_1.Bullet(this.sprite.x, this.sprite.y, this.damage);
            stage.addChild(bullet.sprite);
            bullet.move();
            bullet.checkCollision(hays);
        }
    };
    return Tank;
}());
exports.Tank = Tank;
