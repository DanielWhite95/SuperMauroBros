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
exports.LiquidTexture = exports.TextureWithNormals = exports.TextureSpecular = exports.TextureDiffuse = exports.TextureMaterial = void 0;
var globals_1 = require("./globals");
var Materials_1 = require("./Materials");
var Shader_1 = require("./Shader");
var textureShader;
var textureDiffuseShader;
var texturePhongShader;
var textureNormalsShader;
var liquidTextureShader;
var texturesCount = 0;
var loadedText = [];
function isPowerOf2(value) {
    return (value & (value - 1)) == 0;
}
function textureLoaderCallback() {
    this.txId = globals_1.Globals.gl.createTexture();
    globals_1.Globals.gl.activeTexture(globals_1.Globals.gl.TEXTURE0 + this.txNum);
    globals_1.Globals.gl.bindTexture(globals_1.Globals.gl.TEXTURE_2D, this.txId);
    globals_1.Globals.gl.texImage2D(globals_1.Globals.gl.TEXTURE_2D, 0, globals_1.Globals.gl.RGBA, globals_1.Globals.gl.RGBA, globals_1.Globals.gl.UNSIGNED_BYTE, this);
    globals_1.Globals.gl.generateMipmap(globals_1.Globals.gl.TEXTURE_2D);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_MIN_FILTER, globals_1.Globals.gl.LINEAR_MIPMAP_LINEAR);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_MAG_FILTER, globals_1.Globals.gl.LINEAR_MIPMAP_LINEAR);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_WRAP_S, globals_1.Globals.gl.REPEAT);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_WRAP_T, globals_1.Globals.gl.REPEAT);
    loadedText[this.txNum] = true;
}
function normalMapLoaderCallback() {
    this.txId = globals_1.Globals.gl.createTexture();
    globals_1.Globals.gl.activeTexture(globals_1.Globals.gl.TEXTURE0 + this.txNum);
    globals_1.Globals.gl.bindTexture(globals_1.Globals.gl.TEXTURE_2D, this.txId);
    globals_1.Globals.gl.texImage2D(globals_1.Globals.gl.TEXTURE_2D, 0, globals_1.Globals.gl.RGBA, globals_1.Globals.gl.RGBA, globals_1.Globals.gl.UNSIGNED_BYTE, this);
    globals_1.Globals.gl.generateMipmap(globals_1.Globals.gl.TEXTURE_2D);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_MIN_FILTER, globals_1.Globals.gl.LINEAR_MIPMAP_LINEAR);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_MAG_FILTER, globals_1.Globals.gl.LINEAR_MIPMAP_LINEAR);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_WRAP_S, globals_1.Globals.gl.REPEAT);
    globals_1.Globals.gl.texParameteri(globals_1.Globals.gl.TEXTURE_2D, globals_1.Globals.gl.TEXTURE_WRAP_T, globals_1.Globals.gl.REPEAT);
    loadedText[this.txNum] = true;
}
var TextureMaterial = /** @class */ (function (_super) {
    __extends(TextureMaterial, _super);
    function TextureMaterial(txFile) {
        var _this = _super.call(this, 255, 255, 255, 255) || this;
        // default white specular
        _this.specR = 0.0;
        _this.specG = 0.0;
        _this.specB = 0.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        _this.uvTime = 0.0;
        if (!textureShader) {
            textureShader = new Shader_1.Shader("vs_tex.glsl", "fs_tex.glsl", true);
        }
        _this.shader = textureShader;
        _this.image = new Image();
        _this.image.txNum = texturesCount;
        loadedText[texturesCount] = false;
        texturesCount++;
        _this.powerOf2 = false;
        var textureDir = globals_1.Globals.textureDir();
        globals_1.Globals.requestCORSIfNotSameOrigin(_this.image, textureDir + txFile);
        _this.image.src = textureDir + txFile;
        _this.image.onload = textureLoaderCallback;
        return _this;
    }
    TextureMaterial.prototype.isLoaded = function () {
        return loadedText[this.image.txNum];
    };
    TextureMaterial.prototype.setRepeat = function (boolean) {
        if (boolean) {
            this.wrap = globals_1.Globals.gl.REPEAT;
        }
        else {
            this.wrap = globals_1.Globals.gl.CLAMP_TO_EDGE;
        }
    };
    TextureMaterial.prototype.setUvTime = function (time) {
        this.uvTime = time;
    };
    TextureMaterial.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        // setup texture
        globals_1.Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        globals_1.Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        globals_1.Globals.gl.uniform1f(specularShineLoc, this.gamma);
        globals_1.Globals.gl.uniform1f(this.shader.getUniformLocation("uvTime"), this.uvTime);
    };
    return TextureMaterial;
}(Materials_1.SimpleMaterial));
exports.TextureMaterial = TextureMaterial;
var TextureDiffuse = /** @class */ (function (_super) {
    __extends(TextureDiffuse, _super);
    function TextureDiffuse(txFile) {
        var _this = _super.call(this, txFile) || this;
        if (!textureDiffuseShader) {
            textureDiffuseShader = new Shader_1.Shader("vs_tex.glsl", "fs_tex_diffuse.glsl", true);
        }
        _this.shader = textureDiffuseShader;
        return _this;
    }
    TextureDiffuse.prototype.setRepeat = function (boolean) {
        if (boolean) {
            this.wrap = globals_1.Globals.gl.REPEAT;
        }
        else {
            this.wrap = globals_1.Globals.gl.CLAMP_TO_EDGE;
        }
    };
    TextureDiffuse.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        // setup texture
        globals_1.Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
    };
    return TextureDiffuse;
}(TextureMaterial));
exports.TextureDiffuse = TextureDiffuse;
var TextureSpecular = /** @class */ (function (_super) {
    __extends(TextureSpecular, _super);
    function TextureSpecular(txFile) {
        var _this = _super.call(this, txFile) || this;
        if (!texturePhongShader) {
            texturePhongShader = new Shader_1.Shader("vs_tex.glsl", "fs_tex_phong.glsl", true);
        }
        _this.specR = 1.0;
        _this.specG = 1.0;
        _this.specB = 1.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        _this.shader = texturePhongShader;
        return _this;
    }
    TextureSpecular.prototype.setRepeat = function (boolean) {
        if (boolean) {
            this.wrap = globals_1.Globals.gl.REPEAT;
        }
        else {
            this.wrap = globals_1.Globals.gl.CLAMP_TO_EDGE;
        }
    };
    TextureSpecular.prototype.setSpecularColor = function (specRed, specGreen, specBlue, specAlpha) {
        this.specR = specRed / 255.0;
        this.specG = specGreen / 255.0;
        this.specB = specBlue / 255.0;
        this.specA = specAlpha / 255.0;
        return this; //useful for chaining setters
    };
    TextureSpecular.prototype.setSpecularShine = function (gamma) {
        this.gamma = gamma;
        return this; // useful for chaining setters
    };
    TextureSpecular.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        // setup texture
        globals_1.Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        var materialDiffLoc = this.shader.getUniformLocation("mDiffColor");
        var materialSpecularLoc = this.shader.getUniformLocation("mSpecColor");
        var specularShineLoc = this.shader.getUniformLocation("mSpecShine");
        globals_1.Globals.gl.uniform4f(materialDiffLoc, this.diffR, this.diffG, this.diffB, this.diffA);
        globals_1.Globals.gl.uniform4f(materialSpecularLoc, this.specR, this.specG, this.specB, this.specA);
        globals_1.Globals.gl.uniform1f(specularShineLoc, this.gamma);
    };
    return TextureSpecular;
}(TextureMaterial));
exports.TextureSpecular = TextureSpecular;
var TextureWithNormals = /** @class */ (function (_super) {
    __extends(TextureWithNormals, _super);
    function TextureWithNormals(txFile, nmapFile) {
        var _this = _super.call(this, txFile) || this;
        if (!textureNormalsShader) {
            textureNormalsShader = new Shader_1.Shader("vs_tex_normals.glsl", "fs_tex_phong.glsl", true);
        }
        _this.specR = 1.0;
        _this.specG = 1.0;
        _this.specB = 1.0;
        _this.specA = 1.0;
        _this.gamma = 100;
        _this.shader = textureNormalsShader;
        _this.normalMap = new Image();
        _this.normalMap.txNum = texturesCount;
        loadedText[texturesCount] = false;
        texturesCount++;
        var textureDir = globals_1.Globals.textureDir();
        globals_1.Globals.requestCORSIfNotSameOrigin(_this.normalMap, textureDir + nmapFile);
        _this.normalMap.src = textureDir + nmapFile;
        _this.normalMap.onload = normalMapLoaderCallback;
        return _this;
    }
    TextureWithNormals.prototype.disableSpecular = function () {
        this.specR = 0.0;
        this.specG = 0.0;
        this.specB = 0.0;
        this.specA = 1.0;
    };
    TextureWithNormals.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        // setup normal map texture
        globals_1.Globals.gl.uniform1i(this.shader.getUniformLocation("uNormalMap"), this.normalMap.txNum);
    };
    return TextureWithNormals;
}(TextureSpecular));
exports.TextureWithNormals = TextureWithNormals;
var LiquidTexture = /** @class */ (function (_super) {
    __extends(LiquidTexture, _super);
    function LiquidTexture(txFile) {
        var _this = _super.call(this, txFile) || this;
        if (!liquidTextureShader) {
            liquidTextureShader = new Shader_1.Shader("vs_tex_liquid.glsl", "fs_tex.glsl", true);
        }
        _this.shader = liquidTextureShader;
        _this.time = 0;
        _this.waveP = 10.0;
        return _this;
    }
    LiquidTexture.prototype.setRepeat = function (boolean) {
        if (boolean) {
            this.wrap = globals_1.Globals.gl.REPEAT;
        }
        else {
            this.wrap = globals_1.Globals.gl.CLAMP_TO_EDGE;
        }
    };
    LiquidTexture.prototype.setWavePeriod = function (period) {
        this.waveP = period;
    };
    LiquidTexture.prototype.setWaveHeight = function (height) {
        this.waveH = height;
    };
    LiquidTexture.prototype.bindShader = function () {
        _super.prototype.bindShader.call(this);
        // setup texture
        globals_1.Globals.gl.uniform1i(this.shader.getUniformLocation("uTexture"), this.image.txNum);
        globals_1.Globals.gl.uniform1f(this.shader.getUniformLocation("wavePeriod"), this.waveP);
        globals_1.Globals.gl.uniform1f(this.shader.getUniformLocation("waveHeight"), this.waveH);
    };
    return LiquidTexture;
}(TextureMaterial));
exports.LiquidTexture = LiquidTexture;
