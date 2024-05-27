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
exports.Hay = void 0;
var PIXI = __importStar(require("pixi.js"));
var Hay = /** @class */ (function () {
    function Hay(position) {
        this.health = 100;
        this.sprite = PIXI.Sprite.from('assets/hay.png');
        this.sprite.x = position.x;
        this.sprite.y = position.y;
        this.sprite.width = 35;
        this.sprite.height = 35;
    }
    Hay.prototype.takeDamage = function (damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.sprite.visible = false;
        }
    };
    return Hay;
}());
exports.Hay = Hay;
