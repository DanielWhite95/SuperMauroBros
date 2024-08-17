"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shader = void 0;
var globals_1 = require("./globals");
var utils = require("../lib/utils");
var Shader = /** @class */ (function () {
    //creates a shader from .vs and .fs files
    function Shader(vsFile, fsFile, use_texture) {
        if (use_texture === void 0) { use_texture = false; }
        var locProgram;
        var vertexShader;
        var fragmentShader;
        var shaderDir = globals_1.Globals.shaderDir();
        utils.loadFiles([shaderDir + vsFile, shaderDir + fsFile], function (shaderText) {
            locProgram = globals_1.Globals.gl.createProgram();
            vertexShader = globals_1.Globals.gl.createShader(globals_1.Globals.gl.VERTEX_SHADER);
            globals_1.Globals.gl.shaderSource(vertexShader, shaderText[0]);
            globals_1.Globals.gl.compileShader(vertexShader);
            if (!globals_1.Globals.gl.getShaderParameter(vertexShader, globals_1.Globals.gl.COMPILE_STATUS)) {
                alert("ERROR IN VS SHADER : " + globals_1.Globals.gl.getShaderInfoLog(vertexShader));
            }
            var fragmentShader = globals_1.Globals.gl.createShader(globals_1.Globals.gl.FRAGMENT_SHADER);
            globals_1.Globals.gl.shaderSource(fragmentShader, shaderText[1]);
            globals_1.Globals.gl.compileShader(fragmentShader);
            if (!globals_1.Globals.gl.getShaderParameter(fragmentShader, globals_1.Globals.gl.COMPILE_STATUS)) {
                alert("ERROR IN FS SHADER : " + globals_1.Globals.gl.getShaderInfoLog(fragmentShader));
            }
            globals_1.Globals.gl.attachShader(locProgram, vertexShader);
            globals_1.Globals.gl.attachShader(locProgram, fragmentShader);
            globals_1.Globals.gl.linkProgram(locProgram);
            if (!globals_1.Globals.gl.getProgramParameter(locProgram, globals_1.Globals.gl.LINK_STATUS)) {
                var info = globals_1.Globals.gl.getProgramInfoLog(locProgram);
                alert("ERROR LINKING GL PROGRAM : " + info);
                throw new Error('Could not compile WebGL program. \n\n' + info);
            }
        });
        this.program = locProgram;
        //enable and link shader attributes
        globals_1.Globals.gl.enableVertexAttribArray(globals_1.Globals.gl.getAttribLocation(this.program, "inPosition"));
        globals_1.Globals.gl.enableVertexAttribArray(globals_1.Globals.gl.getAttribLocation(this.program, "inNormal"));
        var uvsLoc = globals_1.Globals.gl.getAttribLocation(this.program, "inUV");
        if (uvsLoc != -1) {
            globals_1.Globals.gl.enableVertexAttribArray(uvsLoc);
            this.textureLoc = globals_1.Globals.gl.getUniformLocation(this.program, "uTexture");
        }
    }
    //activates this shader
    Shader.prototype.use = function () {
        globals_1.Globals.gl.useProgram(this.program);
    };
    //getters for attributes locations
    Shader.prototype.getPositionsLocation = function () { return globals_1.Globals.gl.getAttribLocation(this.program, "inPosition"); };
    Shader.prototype.getNormalsLocation = function () { return globals_1.Globals.gl.getAttribLocation(this.program, "inNormal"); };
    Shader.prototype.getUVsLocation = function () { return globals_1.Globals.gl.getAttribLocation(this.program, "inUV"); };
    Shader.prototype.getMatrixLocation = function () { return globals_1.Globals.gl.getUniformLocation(this.program, "worldProjectionMatrix"); };
    Shader.prototype.getWorldViewMatrixLocation = function () { return globals_1.Globals.gl.getUniformLocation(this.program, "worldViewMatrix"); };
    Shader.prototype.getNormalMatrixLocation = function () { return globals_1.Globals.gl.getUniformLocation(this.program, "nMatrix"); };
    Shader.prototype.getTextureLocation = function () { return globals_1.Globals.gl.getUniformLocation(this.program, "uTexture"); };
    Shader.prototype.getUniformLocation = function (locationName) {
        return globals_1.Globals.gl.getUniformLocation(this.program, locationName);
    };
    return Shader;
}());
exports.Shader = Shader;
