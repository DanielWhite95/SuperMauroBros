"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
var Canvas_1 = require("./Canvas");
var Input_1 = require("./Input");
var Scene_1 = require("./Scene");
function main() {
    Canvas_1.Canvas.init();
    Input_1.Input.init();
    Scene_1.Scene.start();
}
