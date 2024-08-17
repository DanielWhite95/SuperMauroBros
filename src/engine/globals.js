"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Globals = void 0;
var Globals = /** @class */ (function () {
    function Globals() {
    }
    Globals.OBJModelsDir = function () {
        return Globals.basePath + 'models/';
    };
    Globals.shaderDir = function () {
        return Globals.basePath + "shaders/";
    };
    Globals.textureDir = function () {
        return Globals.basePath + "textures";
    };
    Globals.requestCORSIfNotSameOrigin = function (img, url) {
        if ((new URL(url)).origin !== window.location.origin) {
            img.crossOrigin = "";
        }
    };
    Globals.basePath = "".concat(window.location);
    //flag to show/hide bounding boxes of every object in the scene
    Globals.showBoundingBoxes = false;
    //flag to toggle fpcamera/lookatcamera, first person = true;
    Globals.cameraMode = true;
    Globals.gravityAccelY = -0.02;
    return Globals;
}());
exports.Globals = Globals;
