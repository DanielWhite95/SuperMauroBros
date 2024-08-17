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
exports.ToonMaterial = exports.SpecularMaterial = exports.DiffuseMaterial = exports.SimpleMaterial = void 0;
var globals_1 = require("./globals");
var Shader_1 = require("./Shader");
var Lights_1 = require("./Lights");
var lambertShader;
var phongShader;
var toonShader;
var simpleShader;
var SimpleMaterial = /** @class */ (function () {
    function SimpleMaterial(diffRed, diffGreen, diffBlue, diffAlpha) {
        this.ambG = 0.0;
        this.ambB = 0.0;
        this.ambA = 0.0;
        // low light ambient
        this.ambLR = 0.0;
        this.ambLG = 0.0;
        this.ambLB = 0.0;
        // upper light ambient
        this.ambLA = 0.0;
        this.ambHR = 0.0;
        this.ambHG = 0.0;
        this.ambHB = 0.0;
        this.ambHA = 0.0;
        //  light ambient direction
        this.ambX = 0;
        this.ambY = 0;
        this.ambZ = 1;
        this.emitR = 0.0;
        this.emitG = 0.0;
        this.emitB = 0.0;
        this.emitA = 1.0;
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
        if (!simpleShader) {
            simpleShader = new Shader_1.Shader("vs_3.glsl", "fs_simple.glsl");
        }
        this.shader = simpleShader;
    }
    SimpleMaterial.prototype.setDiffuseColor = function (diffRed, diffGreen, diffBlue, diffAlpha) {
        this.diffR = diffRed / 255.0;
        this.diffG = diffGreen / 255.0;
        this.diffB = diffBlue / 255.0;
        this.diffA = diffAlpha / 255.0;
    };
    SimpleMaterial.prototype.setAmbientLowColor = function (ambRed, ambGreen, ambBlue, ambAlpha) {
        this.ambLR = ambRed / 255.0;
        this.ambLG = ambGreen / 255.0;
        this.ambLB = ambBlue / 255.0;
        this.ambLA = ambAlpha / 255.0;
    };
    SimpleMaterial.prototype.setAmbientHighColor = function (ambRed, ambGreen, ambBlue, ambAlpha) {
        this.ambHR = ambRed / 255.0;
        this.ambHG = ambGreen / 255.0;
        this.ambHB = ambBlue / 255.0;
        this.ambHA = ambAlpha / 255.0;
    };
    SimpleMaterial.prototype.setAmbientDirection = function (ambX, ambY, ambZ) {
        this.ambX = ambX;
        this.ambY = ambY;
        this.ambZ = ambZ;
    };
    SimpleMaterial.prototype.setMaterialAmbient = function (mambR, mambG, mambB, mambA) {
        this.ambR = mambR / 255.0;
        this.ambG = mambG / 255.0;
        this.ambB = mambB / 255.0;
        this.ambA = mambA / 255.0;
    };
    SimpleMaterial.prototype.setEmissionColor = function (emitRed, emitGreen, emitBlue, emitAlpha) {
        this.emitR = emitRed / 255.0;
        this.emitG = emitGreen / 255.0;
        this.emitB = emitBlue / 255.0;
        this.emitA = emitAlpha / 255.0;
    };
    SimpleMaterial.prototype.isLoaded = function () {
        return true;
    };
    SimpleMaterial.prototype.bindShader = function () {
        this.shader.use();
        Lights_1.Light.bindAllLights(this.shader);
        var materialDiffLoc = this.shader.getUniformLocation("mColor");
        var materialAmbientLoc = this.shader.getUniformLocation("mAmbientColor");
        var materialEmitLoc = this.shader.getUniformLocation("mEmitColor");
        var ambHLoc = this.shader.getUniformLocation("ambientHighColor");
        var ambLLoc = this.shader.getUniformLocation("ambientLowColor");
        var ambDLoc = this.shader.getUniformLocation("ambientDir");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        globals_1.Globals.gl.uniform4f(materialAmbientLoc, this.ambR, this.ambG, this.ambB, this.ambA);
        globals_1.Globals.gl.uniform4f(materialEmitLoc, this.emitR, this.emitG, this.emitB, this.emitA);
        if (ambDLoc) {
            globals_1.Globals.gl.uniform4f(ambLLoc, this.ambLR, this.ambLG, this.ambLB, this.ambLA);
            globals_1.Globals.gl.uniform4f(ambHLoc, this.ambHR, this.ambHG, this.ambHB, this.ambHA);
            globals_1.Globals.gl.uniform3f(ambDLoc, this.ambX, this.ambY, this.ambZ);
        }
    };
    return SimpleMaterial;
}());
exports.SimpleMaterial = SimpleMaterial;
var DiffuseMaterial = /** @class */ (function (_super) {
    __extends(DiffuseMaterial, _super);
    function DiffuseMaterial(diffRed, diffGreen, diffBlue, diffAlpha) {
        var _this = _super.call(this, diffRed, diffGreen, diffBlue, diffAlpha) || this;
        // default white specular
        _this.specR = 1.0;
        _this.specG = 1.0;
        _this.specB = 1.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        if (!lambertShader) {
            lambertShader = new Shader_1.Shader("vs_3.glsl", "fs_lambert.glsl");
        }
        _this.shader = lambertShader;
        return _this;
    }
    DiffuseMaterial.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
    };
    return DiffuseMaterial;
}(SimpleMaterial));
exports.DiffuseMaterial = DiffuseMaterial;
var SpecularMaterial = /** @class */ (function (_super) {
    __extends(SpecularMaterial, _super);
    function SpecularMaterial(diffRed, diffGreen, diffBlue, diffAlpha) {
        var _this = _super.call(this, diffRed, diffGreen, diffBlue, diffAlpha) || this;
        // default white specular
        _this.specR = 1.0;
        _this.specG = 1.0;
        _this.specB = 1.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        if (!phongShader) {
            phongShader = new Shader_1.Shader("vs_3.glsl", "fs_phong.glsl");
        }
        _this.shader = phongShader;
        return _this;
    }
    SpecularMaterial.prototype.setSpecularColor = function (specRed, specGreen, specBlue, specAlpha) {
        this.specR = specRed / 255.0;
        this.specG = specGreen / 255.0;
        this.specB = specBlue / 255.0;
        this.specA = specAlpha / 255.0;
        return this; //useful for chaining setters
    };
    SpecularMaterial.prototype.setSpecularShine = function (gamma) {
        this.gamma = gamma;
        return this; // useful for chaining setters
    };
    SpecularMaterial.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        globals_1.Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        globals_1.Globals.gl.uniform1f(specularShineLoc, this.gamma);
    };
    return SpecularMaterial;
}(SimpleMaterial));
exports.SpecularMaterial = SpecularMaterial;
var ToonMaterial = /** @class */ (function (_super) {
    __extends(ToonMaterial, _super);
    function ToonMaterial(diffRed, diffGreen, diffBlue, diffAlpha, diffThreshold, specThreshold) {
        var _this = _super.call(this, diffRed, diffGreen, diffBlue, diffAlpha) || this;
        // default white specular
        _this.specR = 1.0;
        _this.specG = 1.0;
        _this.specB = 1.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        _this.diffTh = diffThreshold;
        _this.specTh = specThreshold;
        if (!toonShader) {
            toonShader = new Shader_1.Shader("vs_3.glsl", "fs_toon.glsl");
        }
        _this.shader = toonShader;
        return _this;
    }
    ToonMaterial.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        globals_1.Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        globals_1.Globals.gl.uniform1f(specularShineLoc, this.gamma);
    };
    return ToonMaterial;
}(SimpleMaterial));
exports.ToonMaterial = ToonMaterial;
