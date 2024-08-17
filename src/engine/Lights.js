"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpotLight = exports.PointLight = exports.DirectionalLight = exports.Light = void 0;
var utils = require("../lib/utils");
var globals_1 = require("./globals");
var Scene_1 = require("./Scene");
var Light = /** @class */ (function () {
    function Light(name, x, y, z) {
        this.name = name; // prefix used in gl variables
        this.x = x;
        this.y = y;
        this.z = z;
        this.Rcolor = 1.0;
        this.Gcolor = 1.0;
        this.Bcolor = 1.0;
        this.movedPosition = [x, y, z, 1.0];
        this.on = 1.0;
        this.rotation = utils.MakeRotateXMatrix(0);
    }
    Light.prototype.setPosition = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
    Light.prototype.setRotation = function (angle, elevation) {
        this.rotation = utils.multiplyMatrices(utils.MakeRotateYMatrix(angle), utils.MakeRotateXMatrix(-elevation));
    };
    Light.prototype.setDirection = function (dirx, diry, dirz) {
        var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
        this.dirx = dirx / length;
        this.diry = diry / length;
        this.dirz = dirz / length;
        this.movedDir = [dirx, diry, dirz];
    };
    Light.prototype.setColor = function (red, green, blue) {
        this.Rcolor = red / 255;
        this.Gcolor = green / 255;
        this.Bcolor = blue / 255;
    };
    Light.prototype.getLightPosition = function () {
        return [this.x, this.y, this.z];
    };
    Light.prototype.getLightDirection = function () {
        return [this.dirx, this.diry, this.dirz];
    };
    Light.prototype.getLightColor3 = function () {
        return [this.Rcolor, this.Gcolor, this.Bcolor];
    };
    Light.prototype.moveToCameraSpace = function (viewMatrix) {
        var lightDirMatrix = utils.invertMatrix(utils.transposeMatrix(viewMatrix));
        var lightPosMatrix = viewMatrix;
        this.movedPosition = utils.multiplyMatrixVector(lightPosMatrix, [
            this.x,
            this.y,
            this.z,
            1.0,
        ]);
        var rotatedDir = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(this.rotation), [this.dirx, this.diry, this.dirz]);
        this.movedDir = utils.multiplyMatrix3Vector3(utils.sub3x3from4x4(lightDirMatrix), rotatedDir);
    };
    Light.prototype.bind = function (shader) {
        var directionLoc = shader.getUniformLocation(this.name + "Dir");
        var colorLoc = shader.getUniformLocation(this.name + "Color");
        var positionLoc = shader.getUniformLocation(this.name + "Pos");
        var targetLoc = shader.getUniformLocation(this.name + "Target");
        var decayLoc = shader.getUniformLocation(this.name + "Decay");
        var coneInLoc = shader.getUniformLocation(this.name + "ConeIn");
        var coneOutLoc = shader.getUniformLocation(this.name + "ConeOut");
        var lightOnLoc = shader.getUniformLocation(this.name + "On");
        globals_1.Globals.gl.uniform1f(lightOnLoc, this.on);
        globals_1.Globals.gl.uniform3f(colorLoc, this.Rcolor, this.Gcolor, this.Bcolor);
        globals_1.Globals.gl.uniform3f(directionLoc, this.movedDir[0], this.movedDir[1], this.movedDir[2]);
        globals_1.Globals.gl.uniform3f(positionLoc, this.movedPosition[0], this.movedPosition[1], this.movedPosition[2]);
        globals_1.Globals.gl.uniform1f(targetLoc, this.targetDistance);
        globals_1.Globals.gl.uniform1f(decayLoc, this.decay);
        globals_1.Globals.gl.uniform1f(coneInLoc, this.coneIn);
        globals_1.Globals.gl.uniform1f(coneOutLoc, this.coneOut);
    };
    Light.moveAllLights = function (viewMatrix) {
        Scene_1.Scene.lights.forEach(function (light) {
            light.moveToCameraSpace(viewMatrix);
        });
    };
    Light.bindAllLights = function (shader) {
        Scene_1.Scene.lights.forEach(function (light) {
            light.bind(shader);
        });
    };
    return Light;
}());
exports.Light = Light;
var DirectionalLight = /** @class */ (function (_super) {
    __extends(DirectionalLight, _super);
    function DirectionalLight(name, dirx, diry, dirz) {
        var _this = _super.call(this, name, 0.0, 0.0, 0.0) || this;
        var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
        _this.dirx = dirx / length;
        _this.diry = diry / length;
        _this.dirz = dirz / length;
        _this.coneIn = 45;
        _this.coneOut = 0;
        _this.targetDistance = 1.0;
        _this.decay = 0.0;
        return _this;
    }
    DirectionalLight.prototype.bind = function (shader) {
        // bind gl variables
        _super.prototype.bind.call(this, shader);
        var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
        globals_1.Globals.gl.uniform3f(lightTypeLoc, 1.0, 0.0, 0.0);
    };
    return DirectionalLight;
}(Light));
exports.DirectionalLight = DirectionalLight;
var PointLight = /** @class */ (function (_super) {
    __extends(PointLight, _super);
    function PointLight(name, x, y, z, target, decay) {
        var _this = _super.call(this, name, x, y, z) || this;
        _this.targetDistance = target;
        _this.decay = decay;
        _this.dirx = 1.0;
        _this.diry = 0.0;
        _this.dirz = 0.0;
        _this.coneIn = 45;
        _this.coneOut = 0;
        return _this;
    }
    PointLight.prototype.bind = function (shader) {
        // bind gl variables
        _super.prototype.bind.call(this, shader);
        var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
        globals_1.Globals.gl.uniform3f(lightTypeLoc, 0.0, 1.0, 0.0);
    };
    return PointLight;
}(Light));
exports.PointLight = PointLight;
var SpotLight = /** @class */ (function (_super) {
    __extends(SpotLight, _super);
    function SpotLight(name, x, y, z, dirx, diry, dirz, target, decay) {
        var _this = _super.call(this, name, x, y, z) || this;
        var length = Math.sqrt(dirx * dirx + diry * diry + dirz * dirz);
        _this.dirx = dirx / length || 0;
        _this.diry = diry / length || -1;
        _this.dirz = dirz / length || 0;
        _this.targetDistance = target || 1.0;
        _this.decay = decay || 0;
        _this.coneIn = 0.5;
        _this.coneOut = 0.5;
        return _this;
    }
    SpotLight.prototype.setDecay = function (decay) {
        this.decay = decay;
    };
    SpotLight.prototype.setTarget = function (target) {
        this.targetDistance = target;
    };
    SpotLight.prototype.setCone = function (coneIn, coneOut) {
        this.coneIn = coneIn;
        this.coneOut = coneOut;
    };
    SpotLight.prototype.bind = function (shader) {
        // bind gl variables
        _super.prototype.bind.call(this, shader);
        var lightTypeLoc = shader.getUniformLocation(this.name + "Type");
        globals_1.Globals.gl.uniform3f(lightTypeLoc, 0.0, 0.0, 1.0);
    };
    return SpotLight;
}(Light));
exports.SpotLight = SpotLight;
